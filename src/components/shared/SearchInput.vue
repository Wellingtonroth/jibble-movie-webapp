<template>
  <div class="search-input">
    <div class="search-input__wrapper">
      <input
        type="text"
        class="search-input__field"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
      />
      <Icon
        icon="mdi:magnify" 
        class="search-input__icon"
        width="20"
        height="20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { modelValue, placeholder } = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
}>(), {
  placeholder: 'Search movies...'
});

const emit = defineEmits<{
  'search': [],
  'update:modelValue': [value: string]
}>();

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  emit('search');
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  gap: 16px;

  &__wrapper {
    position: relative;
    flex: 1;
  }

  &__field {
    width: 100%;
    padding: 8px 16px;
    padding-right: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  &__icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
}
</style> 