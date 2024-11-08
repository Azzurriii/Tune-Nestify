import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  private accessToken: string;

  constructor(private readonly configService: ConfigService) {}

  private async getAccessToken() {
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    const response = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.access_token;
  }

  async getArtist(artistId: string) {
    if (!this.accessToken) {
      this.accessToken = await this.getAccessToken();
    }

    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    });

    const { name, id, images, genres } = response.data;
    return {
      name,
      spotifyId: id,
      image : images[0]?.url || null,
      genres: genres.join(', ') || null,
    };
  }

  async getSeveralArtists(artistIds: string[]) {
    if (!this.accessToken) {
      this.accessToken = await this.getAccessToken();
    }

    const response = await axios.get(`https://api.spotify.com/v1/artists`, {
      params: {
        ids: artistIds.join(',')
      },
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    });
  
    return response.data.artists.map(artist => ({
      name: artist.name,
      spotifyId: artist.id,
      image: artist.images[0]?.url || '',
      genres: artist.genres.join(', ') || '',
    }));
  }
}
