<script setup lang="ts">
import { ZInputNumber } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(10)
</script>

<template>
  <ZInputNumber v-model="count" aria-label="并发数量" :min="1" :max="100" :step="1" />
</template>
