<script setup lang="ts">
import { ZIconButton } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <ZIconButton aria-label="刷新配置" @click="count++">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M20 7v5h-5M4 17v-5h5M6.1 6.1A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.9 5.9" />
    </svg>
  </ZIconButton>
  <output aria-label="刷新次数">{{ count }}</output>
</template>
