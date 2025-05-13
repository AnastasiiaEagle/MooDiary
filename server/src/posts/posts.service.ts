import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { Posts } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PostsService {

  constructor (private readonly prismaService: PrismaService){}

  async create(dto: PostDto): Promise<Posts> {
    const {title, content, emotion, userId} = dto

    const isUser = await this.prismaService.users.findUnique({
      where: {
        id: userId
      }
    })
    if(!isUser){
      throw new NotFoundException('Нічого не знайдено')
    }

    const post = await this.prismaService.posts.create({
      data: {
        title,
        content,
        emotion,
        user: {
          connect: { id: userId }
        },
      }
    })

    return await post
  }

  async findAll() {
    return await this.prismaService.posts.findMany({
      select:({
        id: true,
        title: true,
        content: true,
        emotion: true,
        userId: true,
        user: true,
        createdAt: true,
      })
    })
  }

  async findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  async update(id: string, dto: PostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
