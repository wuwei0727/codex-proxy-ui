<script setup lang="ts">
import type { ButtonType } from '@codex-proxy/ui'
import { ZButton } from '@codex-proxy/ui'

const types: Record<ButtonType, string> = {
  default: '默认',
  primary: '主要',
  success: '成功',
  info: '信息',
  warning: '警告',
  danger: '危险',
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <ZButton v-for="(label, type) in types" :key="type" :type="type" disabled>
      {{ label }}
    </ZButton>
  </div>
</template>
