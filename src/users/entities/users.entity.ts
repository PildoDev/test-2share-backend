import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users', { schema: 'grocery_sch' })
export class UsersEntity {
  @ApiProperty({
    example: '123',
    description: 'The unique ID for the table, is auto generated',
    required: false,
  })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: true,
  })
  @Column('character varying', { name: 'name', nullable: false })
  name: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Email of the user',
    required: true,
  })
  @Column('character varying', { name: 'email', nullable: false })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
    required: true,
  })
  @Column('character varying', { name: 'password', nullable: false })
  password: string;

  // Traceability columns for the information, all entities that are created must have these 3 columns.
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

  @ApiProperty({
    example: null,
    description:
      'Date of the deletion of the record, this column is used to make soft deletes, this column is null by default',
    required: false,
  })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}