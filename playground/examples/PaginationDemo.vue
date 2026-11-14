<script setup lang="ts">
import { ZPagination } from '@codex-proxy/ui/pagination'
import { ref } from 'vue'

const page = ref(1)
const size = ref(20)
</script>

<template>
  <ZPagination v-model:current-page="page" v-model:page-size="size" :total="123" />
</template>
