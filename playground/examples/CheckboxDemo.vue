<script setup lang="ts">
import { ZCheckbox } from '@codex-proxy/ui'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <ZCheckbox v-model="checked" label="允许修改响应头" />
</template>
