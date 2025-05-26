import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Movie } from '@/types/movie';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Movie[]>([]);
  const favoritesCurrentPage = ref<number>(1);
  const totalPages = ref<number>(0);
  const itemsPerPage = ref<number>(10);
  const isLoading = ref<boolean>(false);

  const loadFavorites = (): void => {
    try {
      isLoading.value = true
      const stored = localStorage.getItem('favoriteMovies');
      if (stored) {
        const parsedMovies = JSON.parse(stored);
        favorites.value = parsedMovies.map((movie: any) => ({
          ...movie,
          Year: Number(movie.Year)
        }));
        totalPages.value = Math.ceil(favorites.value.length / itemsPerPage.value);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      throw error
    } finally {
      isLoading.value = false;
    }
  };

  const toggleFavorite = (movie: Movie): void => {
    try {
      isLoading.value = true
      const isFavorite = favorites.value.some(fav => fav.imdbID === movie.imdbID);
      if (isFavorite) {
        favorites.value = favorites.value.filter(fav => fav.imdbID !== movie.imdbID);
      } else {
        favorites.value.push(movie);
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites.value));
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error
    } finally {
      isLoading.value = false;
    }
  };

  const isFavorite = (id: string): boolean => {
    return favorites.value.some((movie: Movie) => movie.imdbID === id);
  };

  const setFavoritesCurrentPage = (page: number): void => {
    favoritesCurrentPage.value = page;
  };

  const setTotalPages = (total: number): void => {
    totalPages.value = total;
  };

  return {
    favorites,
    favoritesCurrentPage,
    totalPages,
    itemsPerPage,
    isLoading,
    toggleFavorite,
    loadFavorites,
    isFavorite,
    setFavoritesCurrentPage,
    setTotalPages,
  };
});
