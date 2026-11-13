<script setup lang="ts">
import { ZSlider } from '@codex-proxy/ui'
import { ref } from 'vue'

const opacity = ref(60)
</script>

<template>
  <ZSlider v-model="opacity" aria-label="禁用状态" disabled />
</template>
