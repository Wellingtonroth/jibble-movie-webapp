import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import movieService from '@/services/movies'
import { DisplayType } from '@/constants/display'
import type { MovieResponse } from '@/types/movie'

vi.mock('@/services/movies', () => ({
  default: {
    getMovies: vi.fn(),
    searchMovies: vi.fn(),
  }
}));

const mockResponse: MovieResponse = {
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

describe('useMoviesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  });

  it('should initialize with default state', () => {
    const store = useMoviesStore();

    expect(store.movies).toEqual([]);
    expect(store.totalPages).toBe(0);
    expect(store.currentPage).toBe(1);
    expect(store.moviesDisplayType).toBe(DisplayType.GRID);
    expect(store.isLoading).toBe(false);
  });

  it('should fetch movies and update state', async () => {
    const store = useMoviesStore();
    const getMoviesMock = movieService.getMovies as Mock;
    getMoviesMock.mockResolvedValue({ data: mockResponse });

    const promise = store.getMovies(1);
    expect(store.isLoading).toBe(true);
    await promise;

    expect(store.movies).toEqual(mockResponse.data);
    expect(store.totalPages).toBe(mockResponse.total_pages);
    expect(store.currentPage).toBe(1);
    expect(store.isLoading).toBe(false);
  });

  it('should handle error when fetching movies', async () => {
    const store = useMoviesStore();
    const getMoviesMock = movieService.getMovies as Mock;
    const error = new Error('Failed to fetch movies');
    getMoviesMock.mockRejectedValue(error);

    await expect(store.getMovies(1)).rejects.toThrow('Failed to fetch movies');
    expect(store.isLoading).toBe(false);
    expect(store.movies).toEqual([]);
  });

  it('should search movies and update state', async () => {
    const store = useMoviesStore();
    const searchMoviesMock = movieService.searchMovies as Mock;
    searchMoviesMock.mockResolvedValue({ data: mockResponse });

    const promise = store.searchMovies('Test Movie', 2);
    expect(store.isLoading).toBe(true);
    await promise;

    expect(store.movies).toEqual(mockResponse.data);
    expect(store.totalPages).toBe(mockResponse.total_pages);
    expect(store.currentPage).toBe(2);
    expect(store.isLoading).toBe(false);
    expect(searchMoviesMock).toHaveBeenCalledWith('Test Movie', 2);
  });

  it('should handle error when searching movies', async () => {
    const store = useMoviesStore();
    const searchMoviesMock = movieService.searchMovies as Mock
    const error = new Error('Failed to search movies');
    searchMoviesMock.mockRejectedValue(error);

    await expect(store.searchMovies('Test Movie', 1)).rejects.toThrow('Failed to search movies');
    expect(store.isLoading).toBe(false);
    expect(store.movies).toEqual([]);
  });

  it('should set display type', () => {
    const store = useMoviesStore();
    store.setDisplayType(DisplayType.LIST);

    expect(store.moviesDisplayType).toBe(DisplayType.LIST);
  });

  it('should set current page', () => {
    const store = useMoviesStore();
    store.setCurrentPage(5);

    expect(store.currentPage).toBe(5);
  });
});
