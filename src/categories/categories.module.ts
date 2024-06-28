import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "./entities/categories.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [],
  controllers: [],
})
export class CategoriesModule {}