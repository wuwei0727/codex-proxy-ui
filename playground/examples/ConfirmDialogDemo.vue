<script setup lang="ts">
import { ZButton, ZConfirmDialog } from '@codex-proxy/ui'
import { shallowRef } from 'vue'

const open = shallowRef(false)
const confirmations = shallowRef(0)
function confirm() {
  confirmations.value++
  open.value = false
}
</script>

<template>
  <div class="demo-row">
    <ZButton type="danger" variant="plain" @click="open = true">
      移除示例项
    </ZButton>
    <output aria-label="确认次数">已确认 {{ confirmations }} 次</output>
    <ZConfirmDialog v-model="open" title="移除示例项" description="此操作只更新演示计数，不会修改真实数据" destructive confirm-text="移除" @confirm="confirm" />
  </div>
</template>
