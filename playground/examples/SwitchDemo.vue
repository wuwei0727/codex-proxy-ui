<script setup lang="ts">
import { ZSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <ZSwitch v-model="enabled" aria-label="启用配置" />
</template>
