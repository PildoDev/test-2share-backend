import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserInputDto {
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

  @ApiProperty({
    example: 'pass123',
    description: 'Password of the user',
    required: true,
  })
  password: string;
}
