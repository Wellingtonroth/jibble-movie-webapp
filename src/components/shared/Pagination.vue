<template>
  <div class="pagination">
    <button 
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === 1 }"
      @click="goToFirstPage" 
      :disabled="currentPage === 1"
    >
      <Icon icon="mdi:chevron-double-left" width="20" height="20" />
    </button>

    <button 
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === 1 }"
      @click="prevPage" 
      :disabled="currentPage === 1"
    >
      <Icon icon="mdi:chevron-left" width="20" height="20" />
      Previous
    </button>

    <div class="pagination__pages">
      <span class="pagination__current">{{ currentPage }}</span>
      <span class="pagination__separator">/</span>
      <span class="pagination__total">{{ totalPages }}</span>
    </div>

    <button 
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === totalPages }"
      @click="nextPage" 
      :disabled="currentPage === totalPages"
    >
      Next
      <Icon icon="mdi:chevron-right" width="20" height="20" />
    </button>

    <button 
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === totalPages }"
      @click="goToLastPage" 
      :disabled="currentPage === totalPages"
    >
      <Icon icon="mdi:chevron-double-right" width="20" height="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { currentPage, totalPages } = defineProps<{
  currentPage: number,
  totalPages: number,
}>();

const emit = defineEmits<{
  'currentPage': [value: number],
}>();

const goToFirstPage = (): void => {
  if (currentPage > 1) {
    emit('currentPage', 1);
  }
};

const prevPage = (): void => {
  if (currentPage > 1) {
    emit('currentPage', currentPage - 1);
  }
};

const nextPage = (): void => {
  if (currentPage < totalPages) {
    emit('currentPage', currentPage + 1);
  }
};

const goToLastPage = (): void => {
  if (currentPage < totalPages) {
    emit('currentPage', totalPages);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;

  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: white;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: #f5f5f5;
      border-color: #ccc;
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__pages {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #666;
    padding: 0 8px;
  }

  &__current {
    font-weight: 600;
    color: #333;
  }

  &__separator {
    color: #ccc;
  }

  &__total {
    color: #999;
  }
}
</style>
