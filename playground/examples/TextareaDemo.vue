<script setup lang="ts">
import { ZFormItem, ZTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <ZFormItem label="配置说明">
    <ZTextarea v-model="description" :rows="3" placeholder="补充说明" />
  </ZFormItem>
</template>
