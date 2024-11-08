import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { SpotifyService } from '../spotify/spotify.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private spotifyService: SpotifyService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    return await this.artistRepository.findOneBy({ id });
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return await this.artistRepository.update(id, updateArtistDto);
  }

  async remove(id: number) {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return await this.artistRepository.delete(id);
  }

  async createFromSpotify(spotifyId: string) {
    const spotifyArtist = await this.spotifyService.getArtist(spotifyId);
    const artist = this.artistRepository.create(spotifyArtist);
    return await this.artistRepository.save(artist);
  }

  async createFromSpotifySeveral(spotifyIds: string[]) {
    const spotifyArtists = await this.spotifyService.getSeveralArtists(spotifyIds);
    const artists = this.artistRepository.create(spotifyArtists);
    return await this.artistRepository.save(artists);
  }
}
