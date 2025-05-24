import api from '../axios';
import { ENDPOINTS } from '../baseUrl';
import type { MovieResponse } from '@/types/movie'

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
  }
};

export default movieService;

