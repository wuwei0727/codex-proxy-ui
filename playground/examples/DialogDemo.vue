<script setup lang="ts">
import { ZButton, ZDialog } from '@codex-proxy/ui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <ZButton @click="open = true">
    编辑配置
  </ZButton>
  <ZDialog v-model="open" title="编辑配置" description="变更在保存后生效">
    <p>在这里放置表单或其他内容</p>
    <template #footer>
      <ZButton @click="open = false">
        关闭
      </ZButton>
    </template>
  </ZDialog>
</template>
