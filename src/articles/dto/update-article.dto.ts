import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @ApiPropertyOptional({
    description: 'The title of the article',
    example: 'Updated Blog Post Title',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'The content of the article',
    example: 'Updated content of the blog post...',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;
}
