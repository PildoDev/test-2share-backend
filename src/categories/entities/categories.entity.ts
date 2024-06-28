import { ApiProperty } from '@nestjs/swagger';
import { GroceriesEntity } from 'src/groceries/entities/groceries.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TBL_categories', { schema: 'grocery_sch' })
export class CategoriesEntity {
  // cCategoryId
  @ApiProperty({
    example: '123',
    description: 'The unique ID for the table, is auto generated',
    required: false,
  })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'cCategoryId' })
  cCategoryId: number;

  // cCategoryName
  @ApiProperty({
    example: 'Fruits',
    description: 'Name of the category of the groceries.',
    required: true,
  })
  @Column('character varying', { name: 'cCategoryName', nullable: false })
  cCategoryName: string;

  // cCategoryDescription
  @ApiProperty({
    example: 'Fresh and seasonal fruits.',
    description: 'Description of the category of the groceries',
    required: true,
  })
  @Column('character varying', {
    name: 'cCategoryDescription',
    nullable: false,
  })
  cCategoryDescription: string;

  // groceriesEntity
  @OneToMany(() => GroceriesEntity, (grocery) => grocery.gGroceryCategory)
  groceries: GroceriesEntity[];

  // createdAt
  @ApiProperty({
    example: '2021-09-01T03:00:00.000Z',
    description:
      'Date of creation of the record, this column is auto generated',
    required: false,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  // updatedAt
  @ApiProperty({
    example: '2021-09-01T03:00:00.000Z',
    description:
      'Date of the last update of the record, this column is auto generated',
    required: false,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;

  // deletedAt
  @ApiProperty({
    example: null,
    description:
      'Date of the deletion of the record, this column is used to make soft deletes, this column is null by default',
    required: false,
  })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
