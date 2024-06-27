import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "./entities/users.entity";
import { UsersController } from "./controller/users.controller";
import { UsersService } from "./service/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}