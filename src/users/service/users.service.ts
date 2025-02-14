import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersEntity } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserOutputDto } from '../dto/registerUserResponse.dto';
import { RegisterUserInputDto } from '../dto/registerUserInput.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async signUp(
    body: RegisterUserInputDto,
  ): Promise<RegisterUserOutputDto | string> {
    const validateUser: UsersEntity = await this.repository.findOne({
      where: {
        uUserEmail: body.email,
        deletedAt: null,
      },
    });

    if (validateUser) {
      throw new BadRequestException('The user is already registered');
    }

    if (!validateUser) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(body.password, salt);
      const newUser = this.repository.create({
        uUserEmail: body.email,
        uUserFullname: body.fullname,
        uUserPassword: hashPassword,
      });
      try {
        const response = await this.repository.save(newUser);
        return {
          id: response.uUserId,
          fullname: response.uUserFullname,
          email: response.uUserEmail,
        };
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
