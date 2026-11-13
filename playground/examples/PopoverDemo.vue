<script setup lang="ts">
import { ZButton, ZPopover } from '@codex-proxy/ui'
</script>

<template>
  <ZPopover placement="bottom" trigger="click">
    <template #reference>
      <ZButton>授权说明</ZButton>
    </template>
    <p style="margin: 0; padding: 8px 12px">
      插件只会使用已明确授予的权限
    </p>
  </ZPopover>
</template>
