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
  getAllMovies(page: number = 1) {
    const uriGet = ENDPOINTS.GET_ALL_MOVIES.replace(':page', page.toString());

    return api.get<MovieResponse>(uriGet);
  },

  searchMovies(title: string, page: number = 1) {
    const uriGet = ENDPOINTS.SEARCH_MOVIES
      .replace(':title', title)
      .replace(':page', page.toString());

    return api.get<MovieResponse>(uriGet);
  },

  getMoviesByYear(year: number, page: number = 1) {
    const uriGet = ENDPOINTS.GET_MOVIES_BY_YEAR
      .replace(':year', year.toString())
      .replace(':page', page.toString());

    return api.get<MovieResponse>(uriGet);
  },

  getMoviesByType(type: string, page: number = 1) {
    const uriGet = ENDPOINTS.GET_MOVIES_BY_TYPE
      .replace(':type', type)
      .replace(':page', page.toString());

    return api.get<MovieResponse>(uriGet);
  },

  getMovieById(id: string) {
    const uriGet = ENDPOINTS.GET_MOVIE_BY_ID.replace(':id', id);
    
    return api.get<MovieResponse>(uriGet);
  }
};

export default movieService;

