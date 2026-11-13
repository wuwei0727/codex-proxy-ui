<script setup lang="ts">
import { defineTableColumns, ZTable } from '@codex-proxy/ui'

const rows = [
  { id: 'workbench', name: '请求工作台', version: '0.1.0' },
  { id: 'inspector', name: '请求检查器', version: '0.2.1' },
]
const columns = defineTableColumns<typeof rows[number]>([
  { key: 'name', label: '插件', kind: 'identity' },
  { key: 'version', label: '版本', kind: 'mono', size: 'sm' },
])
</script>

<template>
  <div style="height: 280px">
    <ZTable :columns="columns" :data="rows" row-key="id" />
  </div>
</template>
