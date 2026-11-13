<script setup lang="ts">
import { ZScrollbar } from '@codex-proxy/ui'
import { ref } from 'vue'

const scrollTop = ref(0)
</script>

<template>
  <ZScrollbar height="224px" horizontal @scroll="scrollTop = $event.scrollTop">
    <div style="min-width: 600px">
      <p v-for="index in 20" :key="index">
        示例内容 {{ index }}
      </p>
    </div>
  </ZScrollbar>
  <output aria-label="滚动位置">已滚动 {{ Math.round(scrollTop) }} px</output>
</template>
