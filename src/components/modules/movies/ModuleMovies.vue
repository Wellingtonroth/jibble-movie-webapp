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
      :total-pages="totalPages"
      :current-page="currentPage"
      :is-loading="isLoading"
    />
  </section>    
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SearchInput from '@/components/shared/SearchInput.vue'
import MoviesDisplay from '@/components/shared/MoviesDisplay.vue'
import Header from '@/components/shared/Header.vue'
import useMovies from '@/composables/useMovies'
import useFavorites from '@/composables/useFavorites'

const searchQuery = ref<string>('');

const { 
  movies,
  isLoading,
  currentPage,
  totalPages,
  getMovies,
  searchMovies,
} = useMovies();

const { loadFavorites } = useFavorites();

const handleSearch = async (): Promise<void> => {
  if (searchQuery.value) {  
    await searchMovies(searchQuery.value);
  } else {
    await getMovies(currentPage.value);
  }
};

watch(currentPage, async (newPage: number): Promise<void> => {
  if (searchQuery.value) {
    await searchMovies(searchQuery.value, newPage);
  } else {
    await getMovies(newPage);
  }
});

onMounted(async (): Promise<void> => {
  await getMovies(currentPage.value);
  await loadFavorites();
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
