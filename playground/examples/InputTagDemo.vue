<script setup lang="ts">
import { ZInputTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const tags = ref(['58 5 * * *', '59 10 * * *'])
</script>

<template>
  <ZInputTag v-model="tags" aria-label="预热时间" placeholder="输入一条 cron" />
</template>
