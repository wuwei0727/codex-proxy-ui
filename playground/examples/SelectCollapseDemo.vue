<script setup lang="ts">
import { ZSelect } from '@codex-proxy/ui'
import { ref } from 'vue'

const group = ref(['production', 'testing', 'development'])
const groups = [
  { value: 'production', label: '生产环境' },
  { value: 'testing', label: '测试环境' },
  { value: 'development', label: '开发环境' },
  { value: 'paused', label: '暂停使用', disabled: true },
]
</script>

<template>
  <ZSelect v-model="group" :options="groups" aria-label="账号分组" class="w-60 max-w-full" multiple collapse-tags collapse-tags-tooltip />
</template>
