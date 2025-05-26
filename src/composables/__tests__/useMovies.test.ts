import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMoviesStore } from '@/stores/movies'
import useMovies from '@/composables/useMovies'
import { DisplayType } from '@/constants/display'

const mockMovies = [
  { Title: 'Movie A', Year: 2020, imdbID: 'tt001' },
  { Title: 'Movie B', Year: 2021, imdbID: 'tt002' }
];

describe('useMovies composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should expose store values as computed properties', () => {
    const store = useMoviesStore();
    store.movies = mockMovies;
    store.totalPages = 5;
    store.currentPage = 2;
    store.isLoading = false;
    store.moviesDisplayType = DisplayType.GRID;

    const composable = useMovies(store);

    expect(composable.movies.value).toEqual(mockMovies);
    expect(composable.totalPages.value).toBe(5);
    expect(composable.currentPage.value).toBe(2);
    expect(composable.isLoading.value).toBe(false);
    expect(composable.displayType.value).toBe(DisplayType.GRID);
  });

  it('should call store.getMovies', async () => {
    const store = useMoviesStore();
    const spy = vi.spyOn(store, 'getMovies').mockResolvedValue();

    const composable = useMovies(store);
    await composable.getMovies(2);

    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should handle error on call store.getMovies', async () => {
    const store = useMoviesStore();
    const composable = useMovies(store);

    const error = new Error('getMovies error');
    vi.spyOn(store, 'getMovies').mockRejectedValue(error);

    await expect(composable.getMovies(1)).rejects.toThrow('getMovies error');
  });

  it('should call store.searchMovies', async () => {
    const store = useMoviesStore();
    const spy = vi.spyOn(store, 'searchMovies').mockResolvedValue();

    const composable = useMovies(store);
    await composable.searchMovies('Batman', 1);

    expect(spy).toHaveBeenCalledWith('Batman', 1);
  });

  it('should handle error on call store.searchMovies', async () => {
    const store = useMoviesStore();
    const composable = useMovies(store);

    const error = new Error('searchMovies error');
    vi.spyOn(store, 'searchMovies').mockRejectedValue(error);

    await expect(composable.searchMovies('ErrorMovie')).rejects.toThrow('searchMovies error');
  });

  it('should call store.setDisplayType', () => {
    const store = useMoviesStore();
    const spy = vi.spyOn(store, 'setDisplayType');

    const composable = useMovies(store);
    composable.setDisplayType(DisplayType.LIST);

    expect(spy).toHaveBeenCalledWith(DisplayType.LIST);
  });

  it('should call store.setCurrentPage', () => {
    const store = useMoviesStore();
    const spy = vi.spyOn(store, 'setCurrentPage');

    const composable = useMovies(store);
    composable.setCurrentPage(4);

    expect(spy).toHaveBeenCalledWith(4);
  });
});
