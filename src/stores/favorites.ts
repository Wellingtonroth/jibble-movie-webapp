import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Movie[]>([])
  const isLoading = ref<boolean>(false)

  const toggleFavorite = (movie: Movie) => {
    try {
      isLoading.value = true
      const isFavorite = favorites.value.some(fav => fav.imdbID === movie.imdbID)
      if (isFavorite) {
        favorites.value = favorites.value.filter(fav => fav.imdbID !== movie.imdbID)
      } else {
        favorites.value.push(movie)
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites.value))
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const loadFavorites = () => {
    try {
      isLoading.value = true
      const stored = localStorage.getItem('favoriteMovies')
      if (stored) {
        const parsedMovies = JSON.parse(stored)
        favorites.value = parsedMovies.map((movie: any) => ({
          ...movie,
          Year: Number(movie.Year)
        }))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const isFavorite = (id: string) => {
    return favorites.value.some(movie => movie.imdbID === id)
  }

  return {
    favorites,
    isLoading,
    toggleFavorite,
    loadFavorites,
    isFavorite,
  }
})
