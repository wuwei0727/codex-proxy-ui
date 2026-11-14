<script setup lang="ts">
import { ZInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <ZInput v-model="text" aria-label="名称" placeholder="请输入名称" />
</template>
