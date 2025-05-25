<template>
  <button
    class="pagination__button"
    :class="{ 'pagination__button--disabled': disabled }"
    :disabled="disabled"
  >
    <Icon :icon="icon" width="20" height="20" />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { icon, disabled } = defineProps<{
  icon: string,
  disabled?: boolean,
}>()
</script>
