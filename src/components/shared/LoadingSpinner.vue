<template>
  <div class="loading-spinner" :class="{ 'loading-spinner--overlay': overlay }">
    <div class="loading-spinner__container">
      <div class="loading-spinner__icon-wrapper">
        <div 
          class="loading-spinner__icon"
        />
      </div>
      <p v-if="message" class="loading-spinner__message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { message, overlay } = defineProps<{
  message: string,
  overlay: boolean,
}>();
</script>

<style lang="scss" scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;

  &--overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1000;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__icon-wrapper {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 32px;
      height: 32px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  &__icon {
    color: #007bff;
    animation: spin 1s linear infinite;
    position: relative;
    z-index: 1;
  }

  &__message {
    color: #666;
    font-size: 14px;
    margin: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 