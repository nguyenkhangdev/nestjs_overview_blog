import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './signin-auth.dto';

export class UpdateUserDto extends PartialType(SignInDto) {}
