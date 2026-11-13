<script setup lang="ts">
import { ZButton } from '@codex-proxy/ui'
</script>

<template>
  <div style="display: flex; gap: 12px">
    <ZButton type="primary" loading>
      保存中
    </ZButton>
    <ZButton variant="plain" loading>
      加载中
    </ZButton>
  </div>
</template>
