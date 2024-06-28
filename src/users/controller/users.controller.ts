import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { UsersEntity } from '../entities/users.entity';
import { Response } from 'express';
import { RegisterUserOutputDto } from '../dto/registerUserResponse.dto';
import { RegisterUserInputDto } from '../dto/registerUserInput.dto';

@ApiTags('Auth')
@Controller('/api/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup/')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
    type: RegisterUserOutputDto,
  })
  async signUp(@Body() body: RegisterUserInputDto, @Res() res: Response) {
    try {
      const result = await this.service.signUp(body);
      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        data: result,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.OK).json({
          message: error.message,
        });
      } else if (error instanceof InternalServerErrorException) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An unexpected error occurred',
        });
      }
    }
  }
}
