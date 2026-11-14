<script setup lang="ts">
import { ZInputTag, ZSlider } from '@codex-proxy/ui'
import { ref } from 'vue'

const tags = ref(['开发环境', '测试环境', '预发布环境', '生产环境'])
const width = ref(240)
</script>

<template>
  <div class="flex min-w-0 flex-col gap-3">
    <ZInputTag v-model="tags" :style="{ width: `${width}px` }" aria-label="折叠标签" collapse-tags collapse-tags-tooltip />
    <ZSlider v-model="width" aria-label="输入框宽度" :min="100" :max="420" unit="px" />
  </div>
</template>
