import { describe, it, expect, vi, beforeEach } from 'vitest';
import movieService from '../index';
import api from '../../axios';
import { ENDPOINTS } from '../../baseUrl';

vi.mock('../../axios', () => ({
  default: {
    get: vi.fn()
  }
}));

const mockMovieResponse = {
  data: {
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
  }
};

describe('MovieService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch movies successfully', async () => {
    const page = 1;
    const expectedUrl = ENDPOINTS.GET_ALL_MOVIES.replace(':page', page.toString());
    (api.get as any).mockResolvedValue(mockMovieResponse);

    const result = await movieService.getMovies(page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockMovieResponse);
  });

  it('should fetch movies with custom page', async () => {
    const page = 2;
    const expectedUrl = ENDPOINTS.GET_ALL_MOVIES.replace(':page', page.toString());
    (api.get as any).mockResolvedValue(mockMovieResponse);

    const result = await movieService.getMovies(page);

    expect(api.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockMovieResponse);
  });
});
