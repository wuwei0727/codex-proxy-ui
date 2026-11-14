<script setup lang="ts">
import { ZColorPicker } from '@codex-proxy/ui'
import { ref } from 'vue'

const color = ref('rgba(37, 99, 235, 0.5)')
</script>

<template>
  <ZColorPicker v-model="color" aria-label="透明度" allow-alpha />
</template>
