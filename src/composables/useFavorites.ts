import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites'
import type { Movie } from '@/types/movie'

export default function useFavorites(favoritesStore = useFavoritesStore()) {
  const favorites = computed<Movie[]>(() => favoritesStore.favorites);
  const isLoading = computed<boolean>(() => favoritesStore.isLoading);
  const currentPage = computed<number>(() => favoritesStore.currentPage);
  const totalPages = computed<number>(() => favoritesStore.totalPages);

  const loadFavorites = (): void => {
    try {
      favoritesStore.loadFavorites()
    } catch (error) {
      console.error('Error loading favorites:', error)
      throw error
    }
  };

  const toggleFavorite = (movie: Movie): void => {
    try {
      favoritesStore.toggleFavorite(movie)
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  };
  
  const isFavorite = (movieId: string): boolean => {
    return favoritesStore.isFavorite(movieId)
  };

  return {
    favorites,
    currentPage,
    totalPages,
    isLoading,
    loadFavorites,
    toggleFavorite,
    isFavorite
  };
};