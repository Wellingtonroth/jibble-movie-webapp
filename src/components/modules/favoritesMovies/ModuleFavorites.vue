<template>
  <section>
    <h1>Favorites</h1>
    <SearchInput 
      v-model="searchQuery" 
      @search="searchMovies"
    />
  </section>    
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/components/shared/SearchInput.vue'

const searchQuery = ref('')

const searchMovies = () => {
  console.log(searchQuery.value)
}
</script>

<style scoped lang="scss">

</style>
