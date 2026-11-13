<script setup lang="ts">
import { ZColorPicker } from '@codex-proxy/ui'
import { themeColorPresets } from '@codex-proxy/ui/theme'
import { ref } from 'vue'

const color = ref('#5983F4')
const presets = themeColorPresets.map(preset => preset.seed)
</script>

<template>
  <ZColorPicker v-model="color" aria-label="主题色" :presets="presets" :allow-alpha="false" />
</template>
