export const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies';

export const ENDPOINTS = {
  SEARCH_MOVIES: `${BASE_URL}/search/?Title=:title&page=:page`,
  GET_ALL_MOVIES: `${BASE_URL}/search/?page=:page`,
  GET_MOVIES_BY_YEAR: `${BASE_URL}/search/?Year=:year&page=:page`,
  GET_MOVIES_BY_TYPE: `${BASE_URL}/search/?Type=:type&page=:page`,
  GET_MOVIE_BY_ID: `${BASE_URL}/search/?imdbID=:id`
};