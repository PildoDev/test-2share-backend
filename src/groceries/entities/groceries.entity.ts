import { ApiProperty } from '@nestjs/swagger';
import { CategoriesEntity } from 'src/categories/entities/categories.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('TBL_groceries', { schema: 'grocery_sch' })
export class GroceriesEntity {
  // gGroceryId
  @ApiProperty({
    example: '123',
    description: 'The unique ID for the table, is auto generated',
    required: false,
  })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'gGroceryId' })
  gGroceryId: number;

  // gGroceryName
  @ApiProperty({
    example: 'Avocado',
    description: 'Name of the grocery',
    required: true,
  })
  @Column('character varying', { name: 'gGroceryName', nullable: false })
  gGroceryName: string;

  // gGroceryOwnerId
  @ApiProperty({
    example: '1',
    description: 'Owner id of the grocery, this column is a foreign key',
    required: true,
  })
  @Column('bigint', { name: 'gGroceryOwnerId', nullable: false })
  gGroceryOwnerId: number;

  @ManyToOne(() => UsersEntity, (user) => user.groceries)
  @JoinColumn({ name: 'gGroceryOwnerId', referencedColumnName: 'uUserId' })
  gGroceryOwner: UsersEntity;

  // gGroceryCategory
  @ApiProperty({
    example: '1',
    description: 'Category id of the grocery, this column is a foreign key',
    required: true,
  })
  @Column('bigint', { name: 'gGroceryCategoryId', nullable: false })
  gGroceryCategoryId: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.groceries)
  @JoinColumn({
    name: 'gGroceryCategoryId',
    referencedColumnName: 'cCategoryId',
  })
  gGroceryCategory: CategoriesEntity;

  // gGroceryBrand
  @ApiProperty({
    example: 'Aguacates Don Julio',
    description: 'Brand of the grocery',
    required: true,
  })
  @Column('character varying', { name: 'gGroceryBrand', nullable: false })
  gGroceryBrand: string;

  // gGroceryTags
  @ApiProperty({
    example: 'green, fresh, organic, healthy, delicious',
    description: 'Tags of the grocery, this column is an array of strings',
    required: true,
  })
  @Column('character varying', { name: 'gGroceryTags', nullable: false })
  gGroceryTags: string[];

  // gGroceryQuantity
  @ApiProperty({
    example: '10',
    description: 'Quantity of the grocery',
    required: true,
  })
  @Column('integer', { name: 'gGroceryQuantity', nullable: false })
  gGroceryQuantity: number;

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
