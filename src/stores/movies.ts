import { ref } from 'vue'
import { defineStore } from 'pinia'
import movieService from '@/services/movies'
import type { Movie } from '@/types/movie'
import { DisplayType } from '@/constants/display'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([]);
  const totalPages = ref<number>(0);
  const currentPage = ref<number>(1);
  const moviesDisplayType = ref<DisplayType>(DisplayType.GRID);
  const isLoading = ref<boolean>(false);

  const getMovies = async (page: number = 1): Promise<void> => {
    try {
      isLoading.value = true
      const response = await movieService.getMovies(page)
      movies.value = response.data.data
      totalPages.value = response.data.total_pages
      currentPage.value = page
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  };

  const searchMovies = async (title: string, page: number = 1): Promise<void> => {
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
  };

  const setDisplayType = (type: DisplayType): void => {
    moviesDisplayType.value = type;
  };

  const setCurrentPage = (page: number): void => {
    currentPage.value = page;
  };

  return {
    movies,
    totalPages,
    currentPage,
    moviesDisplayType,
    isLoading,
    getMovies,
    searchMovies,
    setDisplayType,
    setCurrentPage,
  };
});
