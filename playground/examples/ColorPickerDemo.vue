<script setup lang="ts">
import { ZCheckbox, ZColorPicker } from '@codex-proxy/ui'
import { themeColorPresets } from '@codex-proxy/ui/theme'
import { shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const color = shallowRef('#5983F4')
const translucent = shallowRef('#5983F480')
const disabled = shallowRef(false)
const presets = themeColorPresets.map(preset => preset.seed)
</script>

<template>
  <DemoPlayground wide>
    <div class="demo-row">
      <ZColorPicker v-model="color" :presets="presets" :allow-alpha="false" :disabled="disabled" aria-label="主题色" />
      <code>{{ color }}</code>
      <ZColorPicker v-model="translucent" :presets="presets" :disabled="disabled" aria-label="半透明颜色" />
      <code>{{ translucent }}</code>
    </div>
    <template #controls>
      <ZCheckbox v-model="disabled" label="禁用颜色选择" />
    </template>
  </DemoPlayground>
</template>
