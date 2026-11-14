<script setup lang="ts">
import { ZInputNumber } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(10)
</script>

<template>
  <ZInputNumber v-model="count" aria-label="步长" :step="5" />
</template>
