import { computed } from 'vue';
import { useMoviesStore } from '@/stores/movies'

export default function useMovies(moviesStore = useMoviesStore()) {
  const movies = computed(() => moviesStore.movies)

  const getMovies = async () => {
    await moviesStore.getMovies()
  }

  return {
    movies,
    getMovies,
  }
};