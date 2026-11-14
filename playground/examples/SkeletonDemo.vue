<script setup lang="ts">
import { ZSkeleton } from '@codex-proxy/ui'
</script>

<template>
  <div style="display: grid; gap: 12px">
    <ZSkeleton shape="circle" style="width: 48px; height: 48px" />
    <ZSkeleton shape="text" style="width: 160px" />
    <ZSkeleton shape="text" style="width: 240px; max-width: 100%" />
  </div>
</template>
