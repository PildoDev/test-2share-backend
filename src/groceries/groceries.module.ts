import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroceriesEntity } from "./entities/groceries.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GroceriesEntity])],
  providers: [],
  controllers: [],
})
export class GroceriesModule {}