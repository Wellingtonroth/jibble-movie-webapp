<template>
  <div class="movies-display">
    <div class="movies-display__header">
      <button 
        v-for="option in DISPLAY_OPTIONS" 
        :key="option.value" 
        @click="handleDisplayTypeChange(option.value)"
        :class="{ 'active': displayType === option.value }"
      >
        <Icon :icon="option.icon" width="16" height="16" />
      </button>
    </div>
  </div>
  <EmptyState
    v-if="!movies.length"
    title="No movies found"
    description="Try searching for a different movie or check your search term"
  />
  <div class="movies-cards" v-else-if="displayType === DisplayType.GRID">
    <MovieCard 
      v-for="(movie, index) in movies" 
      :key="movie.imdbID" 
      :movie="movie"
      :index="index"
    />
  </div>
  <div class="movies-list" v-else>
    <MoviesList 
      v-for="(movie, index) in movies" 
      :key="movie.imdbID" 
      :movie="movie"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import MovieCard from '@/components/shared/MovieCard.vue'
import MoviesList from '@/components/shared/MoviesList.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import useMovies from '@/composables/useMovies'
import { DISPLAY_OPTIONS, DisplayType } from '@/constants/display'
import { Icon } from '@iconify/vue'

const { 
  movies,
  displayType,
  setDisplayType,
} = useMovies();

const handleDisplayTypeChange = (type: DisplayType) => {
  setDisplayType(type)
}
</script>

<style scoped lang="scss">
.movies-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.movies-display__header {
  display: flex;
  gap: 10px;
  margin: 30px 0;

  button {
    padding: 6px 10px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
  }

  .active {
    background-color: #007bff;
    color: #fff;
  }
}
</style>
