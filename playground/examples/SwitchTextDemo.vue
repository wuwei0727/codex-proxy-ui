<script setup lang="ts">
import { ZSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <ZSwitch v-model="enabled" aria-label="文字描述" active-text="开" inactive-text="关" inline-prompt />
</template>
