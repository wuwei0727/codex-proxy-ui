<script setup lang="ts">
import { ZDatePicker } from '@codex-proxy/ui'
import { ref } from 'vue'

const date = ref('')
</script>

<template>
  <ZDatePicker v-model="date" value-format="YYYY-MM-DD" aria-label="日期" />
</template>
