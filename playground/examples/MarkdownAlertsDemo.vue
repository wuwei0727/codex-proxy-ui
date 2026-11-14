<script setup lang="ts">
import { ZMarkdown } from '@codex-proxy/ui/markdown'

const source = [
  '> [!NOTE]',
  '> 本地设置仅在当前浏览器生效',
  '',
  '> [!TIP]',
  '> 通过 `source` 可以动态更新 Markdown 内容',
  '',
  '> [!IMPORTANT]',
  '> 修改共享配置会影响后续请求，保存前请检查配置',
  '',
  '> [!WARNING]',
  '> 继续操作可能中断正在执行的请求',
  '',
  '> [!CAUTION]',
  '> 删除后无法恢复，请先备份需要保留的数据',
].join('\n')
</script>

<template>
  <ZMarkdown :source="source" />
</template>
