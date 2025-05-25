<template>
  <div class="pagination">
    <button 
      @click="prevPage" 
      :disabled="currentPage === 1"
    >
      Previous
    </button>
    <span>{{ currentPage }}</span>
    <button 
      @click="nextPage" 
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const { currentPage, totalPages } = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  'currentPage': [value: number]  
}>();

const prevPage = () => {
  if (currentPage > 1) {
    emit('currentPage', currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    emit('currentPage', currentPage + 1);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
