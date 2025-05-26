import { describe, it, expect, vi, beforeEach } from 'vitest';
import movieService from '../index';
import api from '../../axios';
import { ENDPOINTS } from '../../baseUrl';
import type { MovieResponse } from '@/types/movie';

vi.mock('../../axios', () => ({
  default: {
    get: vi.fn()
  }
}));

const mockMovieResponse: MovieResponse = {
  page: 1,
  per_page: 10,
  total: 100,
  total_pages: 10,
  data: [
    {
      Title: 'Test Movie',
      Year: 2024,
      imdbID: 'tt1234567'
    }
  ]
};

describe('MovieService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch movies successfully', async () => {
    const page = 1;
    const expectedUrl = ENDPOINTS.GET_ALL_MOVIES.replace(':page', page.toString());
    (api.get as any).mockResolvedValue({ data: mockMovieResponse });

    const result = await movieService.getMovies(page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: mockMovieResponse });
  });

  it('should fetch movies with custom page', async () => {
    const page = 2;
    const expectedUrl = ENDPOINTS.GET_ALL_MOVIES.replace(':page', page.toString());
    (api.get as any).mockResolvedValue({ data: mockMovieResponse });

    const result = await movieService.getMovies(page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: mockMovieResponse });
  });

  it('should search movies successfully', async () => {
    const title = 'Test Movie';
    const page = 1;
    const expectedUrl = ENDPOINTS.SEARCH_MOVIES.replace(':title', title).replace(':page', page.toString());
    (api.get as any).mockResolvedValue({ data: mockMovieResponse });

    const result = await movieService.searchMovies(title, page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: mockMovieResponse });
  });

  it('should search movies with custom page', async () => {
    const title = 'Test Movie';
    const page = 2;
    const expectedUrl = ENDPOINTS.SEARCH_MOVIES.replace(':title', title).replace(':page', page.toString());
    (api.get as any).mockResolvedValue({ data: mockMovieResponse });

    const result = await movieService.searchMovies(title, page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: mockMovieResponse });
  });

  it('should return empty array if no movies found', async () => {
    const title = 'Non-existent Movie';
    const page = 1;
    const expectedUrl = ENDPOINTS.SEARCH_MOVIES.replace(':title', title).replace(':page', page.toString());
    const emptyResponse: MovieResponse = {
      page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
      data: []
    };
    (api.get as any).mockResolvedValue({ data: emptyResponse });

    const result = await movieService.searchMovies(title, page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: emptyResponse });
  });
});
