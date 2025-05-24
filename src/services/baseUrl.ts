export const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies';

export const ENDPOINTS = {
  SEARCH_MOVIES: (title: string, page: number) => `${BASE_URL}/search/?Title=${title}&page=${page}`,
  GET_ALL_MOVIES: (page: number) => `${BASE_URL}/search/?page=${page}`,
  GET_MOVIES_BY_YEAR: (year: number, page: number) => `${BASE_URL}/search/?Year=${year}&page=${page}`,
  GET_MOVIES_BY_TYPE: (type: string, page: number) => `${BASE_URL}/search/?Type=${type}&page=${page}`,
  GET_MOVIE_BY_ID: (id: string) => `${BASE_URL}/search/?imdbID=${id}`
};