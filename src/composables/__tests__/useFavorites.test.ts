import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import useFavorites from '@/composables/useFavorites'
import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockMovie = {
  Title: 'Mock Movie',
  Year: 2000,
  imdbID: 'tt0011223'
};

describe('useFavorites composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should expose store values as computed properties', () => {
    const store = useFavoritesStore();
    const composable = useFavorites(store);

    expect(composable.favorites.value).toEqual([]);
    expect(composable.isLoading.value).toBe(false);
    expect(composable.favoritesCurrentPage.value).toBe(1);
    expect(composable.totalPages.value).toBe(0);
    expect(composable.itemsPerPage.value).toBe(10);
  })

  it('should call store.loadFavorites', () => {
    const store = useFavoritesStore();
    const spy = vi.spyOn(store, 'loadFavorites');

    const composable = useFavorites(store);
    composable.loadFavorites();

    expect(spy).toHaveBeenCalled();
  });

  it('should handle error on call store.loadFavorites', () => {
    const store = useFavoritesStore();
    const composable = useFavorites(store);
  
    const error = new Error('loadFavorites error');
    vi.spyOn(store, 'loadFavorites').mockImplementation(() => {
      throw error;
    });
  
    expect(() => composable.loadFavorites()).toThrow('loadFavorites error');
  });

  it('should call store.toggleFavorite', () => {
    const store = useFavoritesStore();
    const spy = vi.spyOn(store, 'toggleFavorite');

    const composable = useFavorites(store);
    composable.toggleFavorite(mockMovie);

    expect(spy).toHaveBeenCalledWith(mockMovie);
  });

  it('should handle error on call store.toggleFavorite', () => {
    const store = useFavoritesStore();
    const composable = useFavorites(store);
  
    const error = new Error('toggleFavorite error');
    vi.spyOn(store, 'toggleFavorite').mockImplementation(() => {
      throw error;
    });
  
    expect(() => composable.toggleFavorite(mockMovie)).toThrow('toggleFavorite error');
  });

  it('should call store.setFavoritesCurrentPage', () => {
    const store = useFavoritesStore();
    const spy = vi.spyOn(store, 'setFavoritesCurrentPage');

    const composable = useFavorites(store);
    composable.setFavoritesCurrentPage(3);

    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should call store.isFavorite', () => {
    const store = useFavoritesStore();
    store.favorites = [mockMovie];

    const composable = useFavorites(store);
    const result = composable.isFavorite('tt0011223');

    expect(result).toBe(true);
  });

  it('should call store.setTotalPages', () => {
    const store = useFavoritesStore();
    const spy = vi.spyOn(store, 'setTotalPages');

    const composable = useFavorites(store);
    composable.setTotalPages(2);

    expect(spy).toHaveBeenCalledWith(2);
  });
});
