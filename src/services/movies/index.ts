import api from '../axios';
import { ENDPOINTS } from '../baseUrl';

export interface Movie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
}

export const movieService = {
  getAllMovies: async (page: number = 1): Promise<MovieResponse> => {
    try {
      const response = await api.get<MovieResponse>(ENDPOINTS.GET_ALL_MOVIES(page));
      return response.data;
    } catch (error) {
      console.error('Error fetching all movies:', error);
      throw error;
    }
  }
};

export default movieService;
