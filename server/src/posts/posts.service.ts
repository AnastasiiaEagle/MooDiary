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
    const post = await this.prismaService.posts.findUnique({
      where: {
        id
      }
    })

    if(!post){
      throw new NotFoundException("Нічого не знайдено")
    } 

    return post
  }

  async update(id: string, dto: PostDto) {
    const post = await this.findOne(id)

    await this.prismaService.posts.update({
      where: {
        id: post.id
      },
      data: {
        title: dto.title,
        content: dto.content,
        emotion: dto.emotion
      }
    })
    return "Оновлення пройшло успішно"
  }

  async remove(id: string) {
    const post = await this.findOne(id)

    await this.prismaService.posts.delete({
      where: {
        id
      }
    })
    return "Видалення пройшло успішно"
  }
}
