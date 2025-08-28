import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The title of the article',
    example: 'My First Blog Post',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'This is the content of my first blog post...',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
