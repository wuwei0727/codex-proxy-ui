<script setup lang="ts">
import { ZButton, ZNotification } from '@codex-proxy/ui'
</script>

<template>
  <ZButton @click="ZNotification.success({ message: '保存成功' })">
    显示提示
  </ZButton>
</template>
