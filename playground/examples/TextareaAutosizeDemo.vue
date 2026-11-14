<script setup lang="ts">
import { ZTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'

const note = ref('')
</script>

<template>
  <ZTextarea v-model="note" aria-label="自适应高度" :autosize="{ minRows: 2, maxRows: 5 }" />
</template>
