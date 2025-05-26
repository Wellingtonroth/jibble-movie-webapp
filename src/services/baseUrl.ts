export const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies';

export const ENDPOINTS = {
  GET_ALL_MOVIES: `${BASE_URL}/search/?page=:page`,
  SEARCH_MOVIES: `${BASE_URL}/search/?Title=:title&page=:page`,
};