<script setup lang="ts">
import { ZMotionIcon } from '@codex-proxy/ui'
import { Box, Sparkles } from '@lucide/vue'
</script>

<template>
  <div class="demo-row">
    <ZMotionIcon class="inline-grid size-14 place-items-center rounded-z-lg bg-z-fill-tertiary text-z-primary-text">
      <Box :size="28" />
    </ZMotionIcon>
    <ZMotionIcon variant="brand" class="inline-grid size-14 place-items-center rounded-z-lg bg-z-fill-tertiary text-z-primary-text">
      <Sparkles :size="28" />
    </ZMotionIcon>
    <span>移动指针查看反馈，系统减少动态效果时不播放</span>
  </div>
</template>
