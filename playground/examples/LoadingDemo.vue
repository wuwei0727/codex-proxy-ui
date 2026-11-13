<script setup lang="ts">
import { vLoading } from '@codex-proxy/ui/loading'
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div v-loading="loading" style="height: 176px">
    待加载的内容
  </div>
</template>
