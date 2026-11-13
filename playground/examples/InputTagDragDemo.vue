<script setup lang="ts">
import { ZInputTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const tags = ref(['开发', '测试', '生产'])
</script>

<template>
  <ZInputTag v-model="tags" aria-label="拖动排序" draggable />
</template>
