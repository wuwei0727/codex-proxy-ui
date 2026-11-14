<script setup lang="ts">
import type { ButtonType, ButtonVariant } from '@codex-proxy/ui'
import { ZButton } from '@codex-proxy/ui'

const types: Record<ButtonType, string> = {
  default: '默认',
  primary: '主要',
  success: '成功',
  info: '信息',
  warning: '警告',
  danger: '危险',
}
const variants: ButtonVariant[] = ['solid', 'plain', 'text', 'link']
</script>

<template>
  <div v-for="variant in variants" :key="variant" class="button-row">
    <ZButton v-for="(label, type) in types" :key="type" :type="type" :variant="variant">
      {{ label }}
    </ZButton>
  </div>
</template>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
