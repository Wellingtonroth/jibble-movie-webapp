<template>
  <div class="search-input">
    <input
      type="text"
      :placeholder="placeholder"
      class="search-input__field"
      :value="modelValue"
      @input="handleInput"
    />
    <button
      class="search-input__button"
      @click="handleSearch"
      :disabled="!modelValue"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { 
  modelValue, 
  placeholder, 
  buttonText
} = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  buttonText?: string
}>(), {
  placeholder: 'Search movies...',
  buttonText: 'Search'
})

const emit = defineEmits<{
  'search': [],
  'update:modelValue': [value: string]
}>();

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

const handleSearch = () => {
  emit('search');
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;

  &__field {
    flex: 1;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #42b883;
    }
  }

  &__button {
    padding: 8px 24px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #3aa876;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style> 