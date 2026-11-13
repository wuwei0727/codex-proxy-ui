<script setup lang="ts">
import { ZInputTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const tags = ref(['开发'])
</script>

<template>
  <ZInputTag v-model="tags" aria-label="空格添加" trigger="Space" />
</template>
