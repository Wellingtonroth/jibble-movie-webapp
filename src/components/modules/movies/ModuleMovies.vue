<template>
  <section class="movies-section">
    <h1>Movies</h1>
    <SearchInput 
      v-model="searchQuery" 
      @search="searchMovies"
    />
    <MoviesDisplay />
  </section>    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInput from '@/components/shared/SearchInput.vue'
import MoviesDisplay from '@/components/modules/movies/MoviesDisplay.vue'
import useMovies from '@/composables/useMovies'

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
}
</style>
