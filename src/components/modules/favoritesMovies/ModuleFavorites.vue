<template>
  <section class="movies-section">
    <div class="movies-section__header">
      <Header />
      <SearchInput 
        v-model="searchQuery"
      />
    </div>
    <MoviesDisplay 
      :data="paginatedFavorites" 
      :total-pages="totalPages"
      :current-page="favoritesCurrentPage"
      :is-loading="isLoading"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
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
  favoritesCurrentPage,
  itemsPerPage,
  loadFavorites,
  setTotalPages,
} = useFavorites();

const filteredFavorites = computed<Movie[]>(() => {
  if (!searchQuery.value) return favorites.value;
  
  const query = searchQuery.value.toLowerCase();
  return favorites.value.filter((movie: Movie) => 
    movie.Title.toLowerCase().includes(query)
  );
});

const paginatedFavorites = computed<Movie[]>(() => {
  const start = (favoritesCurrentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredFavorites.value.slice(start, end);
});

watch(filteredFavorites, (): void => {
  const total = Math.ceil(filteredFavorites.value.length / itemsPerPage.value);
  setTotalPages(total || 1);
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
