import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(100, { message: 'Title maximum 100 characters' })
  title: string;

  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;
}
