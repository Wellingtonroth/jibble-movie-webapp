<template>
  <section class="movies-section">
    <h1>Movies</h1>
    <SearchInput 
      v-model="searchQuery" 
      @search="searchMovies"
    />
    <div class="movies-cards">
      <MovieCard 
        v-for="(movie, index) in movies" 
        :key="movie.imdbID" 
        :movie="movie"
        :index="index"
      />
    </div>
  </section>    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useMovies from '@/composables/useMovies'
import SearchInput from '@/components/shared/SearchInput.vue'
import MovieCard from '@/components/shared/MovieCard.vue'

const searchQuery = ref<string>('');

const { 
  movies, 
  getAllMovies,
} = useMovies();

const searchMovies = () => {
  console.log(searchQuery.value)
};

onMounted(() => {
  getAllMovies()
})
</script>

<style scoped lang="scss">
.movies-section {
  padding: 20px;
  
  .movies-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}

</style>
