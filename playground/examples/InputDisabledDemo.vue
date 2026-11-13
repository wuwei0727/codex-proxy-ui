<script setup lang="ts">
import { ZInput } from '@codex-proxy/ui'
import { Activity } from '@lucide/vue'
</script>

<template>
  <ZInput model-value="12" type="number" aria-label="次数" disabled>
    <template #prefix>
      <Activity class="size-4" />
    </template>
  </ZInput>
</template>
