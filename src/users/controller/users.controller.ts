import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { UsersEntity } from '../entities/users.entity';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('/api/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup/')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario creado',
    type: UsersEntity,
  })
  signUp(@Body() body: UsersEntity, @Res() res: Response) {
    return this.service.signUp(body, res);
  }
}
