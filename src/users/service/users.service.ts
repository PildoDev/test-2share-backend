import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersEntity } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async signUp(body: UsersEntity, res: Response): Promise<any> {
    const validateUser: UsersEntity = await this.repository.findOne({
      where: {
        email: body.email,
        deletedAt: null,
      },
    });
    if (!validateUser) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(body.password, salt);
      body.password = hashPassword;
      return await this.repository
        .save(body)
        .then(async (response) => {
          res.status(HttpStatus.CREATED).json({
            message: 'Usuario creado con exito',
            data: {
              id: response.id,
              name: response.name,
              email: response.email,
            },
          });
        })
        .catch((err) => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'No fue posible crear el usuario',
            errors: err.message,
          });
        });
    }

    res.status(HttpStatus.BAD_REQUEST).json({
      message: 'El nombre de usuario ya se encuentra registrado',
    });
  }
}
