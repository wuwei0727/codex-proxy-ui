<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <header
    class="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2"
  >
    <div class="min-w-0 flex-1 basis-64">
      <h1 class="m-0 text-lg font-bold tracking-tight text-z-text leading-tight">
        {{ title }}
      </h1>
      <p
        v-if="description || $slots.description"
        class="mt-1 mb-0 flex items-center gap-1.5 text-xs text-z-text-tertiary leading-normal"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>
    <div
      v-if="$slots.actions"
      class="flex shrink-0 items-center justify-end gap-2"
    >
      <slot name="actions" />
    </div>
  </header>
</template>
