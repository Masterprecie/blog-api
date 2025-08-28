import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ArticleResponseDto } from './dto/article-response.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new article',
    description:
      'Creates a new blog article with the provided title and content',
  })
  @ApiBody({ type: CreateArticleDto })
  @ApiCreatedResponse({
    description: 'Article successfully created',
    type: ArticleResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request - validation failed',
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all articles',
    description:
      'Retrieves a list of all blog articles ordered by creation date (newest first)',
  })
  @ApiOkResponse({
    description: 'List of all articles',
    type: [ArticleResponseDto],
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get article by ID',
    description: 'Retrieves a specific article by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Article ID',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Article found',
    type: ArticleResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update article by ID',
    description:
      'Updates an existing article completely with the provided data',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Article ID',
    example: '1',
  })
  @ApiBody({ type: UpdateArticleDto })
  @ApiOkResponse({
    description: 'Article updated successfully',
    type: ArticleResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request - validation failed',
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete article by ID',
    description: 'Permanently removes an article from the database',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Article ID',
    example: '1',
  })
  @ApiNoContentResponse({
    description: 'Article successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
  })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
