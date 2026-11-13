<script setup lang="ts">
import { ZSlider } from '@codex-proxy/ui'
import { ref } from 'vue'

const opacity = ref(60)
</script>

<template>
  <ZSlider v-model="opacity" aria-label="透明度" :min="0" :max="100" :step="5" unit="%" />
</template>
