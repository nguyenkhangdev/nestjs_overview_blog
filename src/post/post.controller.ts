import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { RequestUser } from 'src/user/interfaces/request-user.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: { user: RequestUser },
  ) {
    const userId = req.user.id;
    const data = await this.postService.create(createPostDto, userId);

    return { message: 'Create post successfully', data: data };
  }

  @Get()
  async findAll() {
    const data = await this.postService.findAll();
    return { message: 'Find post successfully', data: data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.postService.findOne(+id);
    return { message: 'Find post successfully', data: data };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const data = await this.postService.update(+id, updatePostDto);
    return { message: 'Update post successfully', data: data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.postService.remove(id);
    return {
      message: 'Delete post successfully',
      data: data,
    };
  }
}
