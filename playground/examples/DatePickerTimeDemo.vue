<script setup lang="ts">
import { ZDatePicker } from '@codex-proxy/ui'
import { ref } from 'vue'

const date = ref('')
</script>

<template>
  <ZDatePicker v-model="date" aria-label="日期时间" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
</template>
