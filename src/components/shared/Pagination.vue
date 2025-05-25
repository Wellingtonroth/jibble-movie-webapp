<template>
  <div class="pagination">
    <PaginationButton
      icon="mdi:chevron-double-left"
      :disabled="isFirstPage"
      @click="goToFirstPage"
    />
    <PaginationButton
      icon="mdi:chevron-left"
      :disabled="isFirstPage"
      @click="prevPage"
    />

    <div class="pagination__pages" aria-label="Current page indicator">
      <span class="pagination__current">{{ currentPage }}</span>
      <span class="pagination__separator">/</span>
      <span class="pagination__total">{{ totalPages }}</span>
    </div>

    <PaginationButton
      icon="mdi:chevron-right"
      :disabled="isLastPage"
      @click="nextPage"
    />
    <PaginationButton
      icon="mdi:chevron-double-right"
      :disabled="isLastPage"
      @click="goToLastPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PaginationButton from '@/components/shared/PaginationButton.vue'

const { currentPage, totalPages } = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'currentPage': [value: number],
}>();

const isFirstPage = computed<boolean>(() => currentPage === 1);
const isLastPage = computed<boolean>(() => currentPage === totalPages);

const goToFirstPage = (): void => {
  if (!isFirstPage.value) emit('currentPage', 1);
};

const prevPage = (): void => {
  if (!isFirstPage.value) emit('currentPage', currentPage - 1);
};

const nextPage = (): void => {
  if (!isLastPage.value) emit('currentPage', currentPage + 1);
};

const goToLastPage = (): void => {
  if (!isLastPage.value) emit('currentPage', totalPages);
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
