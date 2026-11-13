<script setup lang="ts">
import { ZRadio } from '@codex-proxy/ui'
import { ref } from 'vue'

const scope = ref('selected')
</script>

<template>
  <ZRadio v-model="scope" name="scope" value="selected" label="指定请求" />
  <ZRadio v-model="scope" name="scope" value="all" label="全部请求" />
</template>
