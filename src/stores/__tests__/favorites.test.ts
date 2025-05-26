import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';

const mockFavorites = [
  { 
    Title: 'Spiderman', 
    Year: 1990, 
    imdbID: 'tt0100669',
  },
  { 
    Title: 'Batman', 
    Year: 1995, 
    imdbID: 'tt0112462',
  }
];

const mockMovie = {
  Title: 'Favorite Movie',
  Year: 2020,
  imdbID: 'tt1233567'
};

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const store = useFavoritesStore();

    expect(store.favorites).toEqual([]);
    expect(store.favoritesCurrentPage).toBe(1);
    expect(store.totalPages).toBe(0);
    expect(store.itemsPerPage).toBe(10);
    expect(store.isLoading).toBe(false);
  });

  it('should fetch favorites movies and update state', () => {
    const store = useFavoritesStore();

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockFavorites));

    store.loadFavorites();
    
    expect(store.favorites).toEqual([
      { Title: 'Spiderman', Year: 1990, imdbID: 'tt0100669' },
      { Title: 'Batman', Year: 1995, imdbID: 'tt0112462' }
    ]);
    expect(store.totalPages).toBe(1);
    expect(store.isLoading).toBe(false);
  });

  it('should handle error when fetching favorites movies',  () => {
    const store = useFavoritesStore();

    const error = new Error('Failed to fetch favorites movies');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw error;
    });

    expect(() => store.loadFavorites()).toThrow('Failed to fetch favorites movies');
    expect(store.isLoading).toBe(false);
    expect(store.favorites).toEqual([]);
  });

  it('should toggle favorite movie and update store', () => {
    const store = useFavoritesStore();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  
    store.toggleFavorite(mockMovie);
  
    expect(store.favorites).toContainEqual(mockMovie);
    expect(setItemSpy).toHaveBeenCalledWith('favoriteMovies', JSON.stringify([mockMovie]));
    expect(store.isLoading).toBe(false);
  
    store.toggleFavorite(mockMovie);
  
    expect(store.favorites).not.toContainEqual(mockMovie);
    expect(setItemSpy).toHaveBeenCalledWith('favoriteMovies', JSON.stringify([]));
    expect(store.isLoading).toBe(false);
  });

  it('should return true if movie is a favorite', () => {
    const store = useFavoritesStore();
    store.favorites = [mockMovie]; 
  
    const result = store.isFavorite(mockMovie.imdbID);
    expect(result).toBe(true);
  });
  
  it('should return false if movie is not a favorite', () => {
    const store = useFavoritesStore();
  
    const result = store.isFavorite('not-exist-id');
    expect(result).toBe(false);
  });
  
  it('should set current page', () => {
    const store = useFavoritesStore();
  
    store.setFavoritesCurrentPage(3);
    expect(store.favoritesCurrentPage).toBe(3);
  });
  
  it('should set total pages', () => {
    const store = useFavoritesStore();
  
    store.setTotalPages(5);
    expect(store.totalPages).toBe(5);
  });
});
