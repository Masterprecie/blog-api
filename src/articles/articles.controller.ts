import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'Article successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'List of all articles' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiResponse({ status: 200, description: 'Article found' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiParam({ name: 'id', type: Number, description: 'Article ID' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update article by ID' })
  @ApiResponse({ status: 200, description: 'Article updated' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', type: Number, description: 'Article ID' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete article by ID' })
  @ApiResponse({ status: 204, description: 'Article deleted' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiParam({ name: 'id', type: Number, description: 'Article ID' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.articlesService.remove(id);
  }
}
