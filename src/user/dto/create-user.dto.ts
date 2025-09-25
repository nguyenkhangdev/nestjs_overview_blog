import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email is Invalid' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'password min 6' })
  password: string;
}
