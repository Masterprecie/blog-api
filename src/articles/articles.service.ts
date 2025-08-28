import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    if (!id || id.trim().length === 0) {
      throw new BadRequestException('Article ID is required');
    }
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    if (!id || id.trim().length === 0) {
      throw new BadRequestException('Article ID is required');
    }

    try {
      return await this.prisma.article.update({
        where: { id },
        data: updateArticleDto,
      });
    } catch (error) {
      if (error) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    if (!id || id.trim().length === 0) {
      throw new BadRequestException('Article ID is required');
    }
    try {
      return await this.prisma.article.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      if (error) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }
      throw error;
    }
  }
}
