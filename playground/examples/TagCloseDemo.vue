<script setup lang="ts">
import { ZTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const tags = ref(['开发', '测试', '生产'])
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <ZTag v-for="tag in tags" :key="tag" closable @close="tags = tags.filter(item => item !== tag)">
      {{ tag }}
    </ZTag>
  </div>
</template>
