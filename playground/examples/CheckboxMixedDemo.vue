<script setup lang="ts">
import { ZCheckbox } from '@codex-proxy/ui'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <ZCheckbox v-model="checked" indeterminate label="已选择部分项目" />
</template>
