<template>
  <section class="movies-section">
    <div class="movies-section__header">
      <Header />
      <SearchInput 
        v-model="searchQuery" 
        @search="handleSearch"
      />
    </div>
    <MoviesDisplay 
      :data="movies"
      :is-loading="isLoading"
    />
  </section>    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInput from '@/components/shared/SearchInput.vue'
import MoviesDisplay from '@/components/shared/MoviesDisplay.vue'
import Header from '@/components/shared/Header.vue'
import useMovies from '@/composables/useMovies'
import useFavorites from '@/composables/useFavorites'

const searchQuery = ref<string>('');

const { 
  movies,
  isLoading,
  getAllMovies,
  searchMovies,
} = useMovies();

const { loadFavorites } = useFavorites();

const handleSearch = () => {
  searchMovies(searchQuery.value);
};

onMounted(() => {
  getAllMovies();
  loadFavorites();
});
</script>

<style scoped lang="scss">
.movies-section {
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>
