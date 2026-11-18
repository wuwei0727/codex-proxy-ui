<script setup lang="ts">
import { ZButton, ZDropdown, ZMenuItem } from '@codex-proxy/ui'
import { shallowRef } from 'vue'

const action = shallowRef('尚未操作')
</script>

<template>
  <ZDropdown menu-class="w-36 p-1.5">
    <template #reference="{ trigger }">
      <ZButton v-bind="trigger">
        更多操作
      </ZButton>
    </template>
    <ZMenuItem @click="action = '编辑'">
      编辑
    </ZMenuItem>
    <ZMenuItem disabled>
      复制
    </ZMenuItem>
    <ZMenuItem @click="action = '导出'">
      导出
    </ZMenuItem>
  </ZDropdown>
  <output aria-label="当前操作">{{ action }}</output>
</template>
