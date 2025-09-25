import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../interfaces/user-role.interface';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional() // không bắt buộc phải truyền
  @IsEnum(UserRole, { message: 'Role must be admin or user' })
  role?: UserRole;
}
