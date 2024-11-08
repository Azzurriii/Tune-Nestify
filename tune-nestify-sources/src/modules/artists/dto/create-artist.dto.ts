import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', example: 'Justin Bieber' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist avatar', example: 'https://example.com/avatar.jpg' })
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Artist genres', example: 'Pop, Rock, Hip-Hop' })
  @IsNotEmpty()
  @IsString()
  genres: string;
}
