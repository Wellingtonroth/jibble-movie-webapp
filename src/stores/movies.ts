import { ref } from 'vue'
import { defineStore } from 'pinia'
import movieService from '@/services/movies'

interface Movie {
  Title: string
  Year: string
  imdbID: string
}

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])

  const getMovies = async () => {
    const response = await movieService.getAllMovies()
    movies.value = response.data.data.map(movie => ({
      ...movie,
      Year: String(movie.Year)
    }))
    return movies.value
  }

  return {
    movies,
    getMovies,
  }
})
