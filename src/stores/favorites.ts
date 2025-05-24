import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Movie {
  Title: string
  Year: string
  imdbID: string
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Movie[]>([])

  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.value.some(fav => fav.imdbID === movie.imdbID)
    if (isFavorite) {
      favorites.value = favorites.value.filter(fav => fav.imdbID !== movie.imdbID)
    } else {
      favorites.value.push(movie)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites.value))
  }

  const loadFavorites = () => {
    const stored = localStorage.getItem('favoriteMovies')
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  }

  const isFavorite = (id: string) => {
    return favorites.value.some(movie => movie.imdbID === id)
  }

  return {
    favorites,
    toggleFavorite,
    loadFavorites,
    isFavorite,
  }
})
