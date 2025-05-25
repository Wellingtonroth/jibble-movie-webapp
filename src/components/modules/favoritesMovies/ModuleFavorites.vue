<template>
  <section class="movies-section">
    <div class="movies-section__header">
      <Header />
      <SearchInput 
        v-model="searchQuery"
      />
    </div>
    <MoviesDisplay 
      :data="filteredFavorites" 
      :is-loading="isLoading"
      :total-pages="totalPages"
      :current-page="currentPage"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SearchInput from '@/components/shared/SearchInput.vue'
import MoviesDisplay from '@/components/shared/MoviesDisplay.vue'
import Header from '@/components/shared/Header.vue'
import useFavorites from '@/composables/useFavorites'
import type { Movie } from '@/types/movie'

const searchQuery = ref<string>('');

const { 
  favorites,
  isLoading,
  totalPages,
  currentPage,
  loadFavorites,
} = useFavorites();

const filteredFavorites = computed<Movie[]>(() => {
  if (!searchQuery.value) return favorites.value;
  
  const query = searchQuery.value.toLowerCase();
  return favorites.value.filter((movie: Movie) => 
    movie.Title.toLowerCase().includes(query)
  );
});

onMounted(() => {
  loadFavorites()
})
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
