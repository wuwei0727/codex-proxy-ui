<script setup lang="ts">
import { ZInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const text = ref('example')
</script>

<template>
  <ZInput v-model="text" aria-label="密码框" show-password />
</template>
