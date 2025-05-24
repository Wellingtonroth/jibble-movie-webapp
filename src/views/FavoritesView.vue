<script setup lang="ts">
import { onMounted } from 'vue'
import { useFavoritesStore } from '../stores/favorites'

const favoritesStore = useFavoritesStore()

onMounted(() => {
  favoritesStore.loadFavorites()
})
</script>

<template>
  <div class="favorites">
    <h2>Favorite Movies</h2>
    
    <div v-if="favoritesStore.favorites.length === 0" class="empty-state">
      No favorite movies yet. Go to the home page to add some!
    </div>

    <div v-else class="movie-list">
      <div v-for="movie in favoritesStore.favorites" :key="movie.imdbID" class="movie-card">
        <h3>{{ movie.Title }}</h3>
        <p>Year: {{ movie.Year }}</p>
        <p>IMDB ID: {{ movie.imdbID }}</p>
        <button @click="favoritesStore.removeFavorite(movie.imdbID)" class="remove-btn">
          Remove from Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favorites {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2em;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.movie-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
}

.remove-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #cc0000;
  }
}
</style> 