<script setup lang="ts">
import { ZInputTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const tags = ref(['开发', '测试'])
</script>

<template>
  <ZInputTag v-model="tags" aria-label="数量限制" :max="3" />
</template>
