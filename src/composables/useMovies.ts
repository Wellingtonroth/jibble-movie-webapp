import { computed } from 'vue';
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types/movie'
import { DisplayType } from '@/constants/display'

export default function useMovies(moviesStore = useMoviesStore()) {
  const movies = computed<Movie[]>(() => moviesStore.movies);
  const totalPages = computed<number>(() => moviesStore.totalPages);
  const currentPage = computed<number>(() => moviesStore.currentPage);
  const isLoading = computed<boolean>(() => moviesStore.isLoading);
  const displayType = computed<DisplayType>(() => moviesStore.moviesDisplayType);

  const getMovies = async (page: number = 1): Promise<void> => {
    try {
      await moviesStore.getMovies(page);
    } catch (error) {
      console.error('Error fetching all movies:', error);
      throw error;
    }
  };

  const searchMovies = async (title: string, page: number = 1): Promise<void> => {
    try {
      await moviesStore.searchMovies(title, page);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  };

  const setDisplayType = (type: DisplayType): void => {
    moviesStore.setDisplayType(type);
  };

  const setCurrentPage = (page: number): void => {
    moviesStore.setCurrentPage(page);
  };

  return {
    movies,
    totalPages,
    currentPage,
    displayType,
    isLoading,
    getMovies,
    searchMovies,
    setDisplayType,
    setCurrentPage,
  };
};