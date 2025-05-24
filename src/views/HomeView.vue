<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFavoritesStore } from '../stores/favorites'

interface Movie {
  Title: string
  Year: string
  imdbID: string
}

interface MovieResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Movie[]
}

const favoritesStore = useFavoritesStore()
const movies = ref<Movie[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const loading = ref(false)

const fetchMovies = async (page: number = 1, title: string = '') => {
  loading.value = true
  try {
    const response = await fetch(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
    )
    const data: MovieResponse = await response.json()
    movies.value = data.data
    totalPages.value = data.total_pages
    currentPage.value = data.page
  } catch (error) {
    console.error('Error fetching movies:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchMovies(1, searchQuery.value)
}

const handlePageChange = (page: number) => {
  fetchMovies(page, searchQuery.value)
}

onMounted(() => {
  fetchMovies()
  favoritesStore.loadFavorites()
})
</script>

<template>
  <div class="home">
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search movies..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">Search</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="movie-list">
      <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
        <h3>{{ movie.Title }}</h3>
        <p>Year: {{ movie.Year }}</p>
        <p>IMDB ID: {{ movie.imdbID }}</p>
        <button
          @click="favoritesStore.toggleFavorite(movie)"
          :class="{ 'favorite-btn': true, 'is-favorite': favoritesStore.isFavorite(movie.imdbID) }"
        >
          {{ favoritesStore.isFavorite(movie.imdbID) ? '★ Favorited' : '☆ Add to Favorites' }}
        </button>
      </div>
    </div>

    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
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

.favorite-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  &.is-favorite {
    background-color: #ffd700;
    color: #000;
    border-color: #ffd700;

    &:hover {
      background-color: #ffed4a;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: #45a049;
    }
  }
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #666;
}
</style> 