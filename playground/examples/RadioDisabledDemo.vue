<script setup lang="ts">
import { ZRadio } from '@codex-proxy/ui'
import { ref } from 'vue'

const selected = ref('all')
</script>

<template>
  <ZRadio v-model="selected" value="all" label="全部请求" disabled />
</template>
