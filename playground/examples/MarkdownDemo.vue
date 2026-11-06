<script setup lang="ts">
import { ZMarkdown } from '@codex-proxy/ui/markdown'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const source = '### 请求工作台\n\n通过 **显式授权** 使用插件能力\n\n- 管理页面\n- 请求中间件\n\n```http\nx-cpr-example: official-example\n```'
</script>

<template>
  <DemoPlayground wide>
    <ZMarkdown :source="source" />
  </DemoPlayground>
</template>
