import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'Artist name', example: 'Justin Timberlake' })
  name: string;

  @ApiProperty({ description: 'Artist avatar', example: 'https://example.com/avatar.jpg' })
  image: string;

  @ApiProperty({ description: 'Artist genres', example: 'Pop, Rock, Hip-Hop' })
  genres: string;
}