<script setup lang="ts">
import { ZInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const text = ref('请求工作台')
</script>

<template>
  <ZInput v-model="text" aria-label="可清空" clearable />
</template>
