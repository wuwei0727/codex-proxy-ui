<script setup lang="ts">
import { ZDatePicker } from '@codex-proxy/ui'
import { ref } from 'vue'

const dates = ref(['2026-11-10', '2026-11-17'])
</script>

<template>
  <ZDatePicker v-model="dates" aria-label="日期范围" type="daterange" value-format="YYYY-MM-DD" />
</template>
