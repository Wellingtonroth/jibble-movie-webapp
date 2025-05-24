import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Movie {
  Title: string
  Year: string
  imdbID: string
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Movie[]>([])

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favoriteMovies')
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites)
    }
  }

  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.value.some(fav => fav.imdbID === movie.imdbID)
    
    if (isFavorite) {
      favorites.value = favorites.value.filter(fav => fav.imdbID !== movie.imdbID)
    } else {
      favorites.value.push(movie)
    }
    
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites.value))
  }

  const removeFavorite = (movieId: string) => {
    favorites.value = favorites.value.filter(movie => movie.imdbID !== movieId)
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites.value))
  }

  const isFavorite = (movieId: string) => {
    return favorites.value.some(fav => fav.imdbID === movieId)
  }

  return {
    favorites,
    loadFavorites,
    toggleFavorite,
    removeFavorite,
    isFavorite
  }
}) 