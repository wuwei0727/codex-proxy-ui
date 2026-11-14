<script setup lang="ts">
import { ZSegmented } from '@codex-proxy/ui/segmented'
import { ref } from 'vue'

const selected = ref('installed')
const options = [{ label: '已安装', value: 'installed' }, { label: '扩展页', value: 'extensions' }]
</script>

<template>
  <div class="demo-stack">
    <ZSegmented v-model="selected" aria-label="插件视图" :options="options" />
    <span>当前视图：{{ selected === 'installed' ? '已安装' : '扩展页' }}</span>
  </div>
</template>
