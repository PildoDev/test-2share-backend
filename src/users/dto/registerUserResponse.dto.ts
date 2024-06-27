import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserOutputDto {
  @ApiProperty({
    example: '2',
    description: 'The unique ID for the user',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: true,
  })
  fullname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
    required: true,
  })
  email: string;
}
