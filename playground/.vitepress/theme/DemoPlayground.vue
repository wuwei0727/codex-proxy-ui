<script setup lang="ts">
defineProps<{ wide?: boolean }>()
</script>

<template>
  <div class="demo-playground vp-raw">
    <div class="demo-stage">
      <div class="demo-preview" :class="{ 'demo-preview-wide': wide }">
        <slot />
      </div>
    </div>
  </div>
</template>
