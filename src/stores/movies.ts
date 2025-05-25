import { ref } from 'vue'
import { defineStore } from 'pinia'
import movieService from '@/services/movies'
import type { Movie } from '@/types/movie'
import { DisplayType } from '@/constants/display'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const totalPages = ref<number>(0)
  const currentPage = ref<number>(1)
  const moviesDisplayType = ref<DisplayType>(DisplayType.GRID)
  const searchQuery = ref<string>('')
  const searchResults = ref<Movie[]>([])
  const searchPage = ref<number>(1)
  const searchTotalPages = ref<number>(0)
  const searchIsLoading = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  const getAllMovies = async (page: number = 1) => {
    try {
      isLoading.value = true
      const response = await movieService.getAllMovies(page)
      movies.value = response.data.data
      totalPages.value = response.data.total_pages
      currentPage.value = page
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const searchMovies = async (title: string, page: number = 1) => {
    try {
      isLoading.value = true
      const response = await movieService.searchMovies(title, page)
      movies.value = response.data.data
      totalPages.value = response.data.total_pages
      currentPage.value = page
    } catch (error) {
      console.error('Error searching movies:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getMoviesByYear = async (year: number, page: number = 1) => {
    try {
      isLoading.value = true
      const response = await movieService.getMoviesByYear(year, page)
      movies.value = response.data.data
      totalPages.value = response.data.total_pages
      currentPage.value = page
    } catch (error) {
      console.error('Error fetching movies by year:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const setDisplayType = (type: DisplayType) => {
    moviesDisplayType.value = type;
  };

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  return {
    movies,
    totalPages,
    currentPage,
    moviesDisplayType,
    isLoading,
    getAllMovies,
    searchMovies,
    getMoviesByYear,
    setDisplayType,
    setCurrentPage,
  }
})
