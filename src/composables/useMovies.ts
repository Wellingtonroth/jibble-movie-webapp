import { computed } from 'vue';
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types/movie'

export default function useMovies(moviesStore = useMoviesStore()) {
  const movies = computed<Movie[]>(() => moviesStore.movies);
  const totalPages = computed<number>(() => moviesStore.totalPages);
  const currentPage = computed<number>(() => moviesStore.currentPage);
  const isLoading = computed<boolean>(() => moviesStore.isLoading);
  const displayType = computed<string>(() => moviesStore.moviesDisplayType);

  const getAllMovies = async (page: number = 1): Promise<void> => {
    try {
      await moviesStore.getAllMovies(page)
    } catch (error) {
      console.error('Error fetching all movies:', error)
      throw error
    }
  };

  const searchMovies = async (title: string, page: number = 1): Promise<void> => {
    try {
      await moviesStore.searchMovies(title, page)
    } catch (error) {
      console.error('Error searching movies:', error)
      throw error
    }
  };

  const getMoviesByYear = async (year: number, page: number = 1): Promise<void> => {
    try {
      await moviesStore.getMoviesByYear(year, page)
    } catch (error) {
      console.error('Error fetching movies by year:', error)
      throw error
    }
  };

  const setDisplayType = (type: string): void => {
    moviesStore.setDisplayType(type);
  };

  return {
    movies,
    totalPages,
    currentPage,
    displayType,
    isLoading,
    getAllMovies,
    searchMovies,
    getMoviesByYear,
    setDisplayType,
  }
};