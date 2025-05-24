import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites'

export default function useFavorites(favoritesStore = useFavoritesStore()) {
  interface Movie {
    Title: string
    Year: string
    imdbID: string
  }

  const favorites = computed(() => favoritesStore.favorites)

  const loadFavorites = async () => {
    await favoritesStore.loadFavorites()
  }

  const toggleFavorite = (movie: Movie) => {
    favoritesStore.toggleFavorite(movie)
  }
  
  const isFavorite = (movieId: string) => {
    return favoritesStore.isFavorite(movieId)
  }

  return {
    favorites,
    
    loadFavorites,
    toggleFavorite,
    isFavorite
  }
};