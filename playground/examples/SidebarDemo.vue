<script setup lang="ts">
import type { SidebarItem } from '@codex-proxy/ui/sidebar'
import { ZIconButton } from '@codex-proxy/ui/icon-button'
import { ZSidebar } from '@codex-proxy/ui/sidebar'
import { Box, ChartNoAxesColumn, FileText, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Puzzle, Settings } from '@lucide/vue'
import { computed, shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const collapse = shallowRef(false)
const activeIndex = shallowRef('overview')
const lastEvent = shallowRef('')
const items: SidebarItem[] = [
  { index: 'overview', label: '概览', icon: LayoutDashboard },
  { index: 'usage', label: '使用统计', icon: ChartNoAxesColumn },
  {
    index: 'plugins',
    label: '插件',
    icon: Puzzle,
    children: [
      { index: 'installed', label: '已安装', icon: Box },
      { index: 'extensions', label: '扩展页', icon: FileText },
    ],
  },
  { index: 'settings', label: '系统设置', icon: Settings, disabled: true },
]
const activeLabel = computed(() => items.flatMap(item => [item, ...item.children ?? []])
  .find(item => item.index === activeIndex.value)
  ?.label ?? '')

function handleSelect(index: string, indexPath: string[]) {
  activeIndex.value = index
  lastEvent.value = `select: ${indexPath.join(' / ')}`
}
</script>

<template>
  <DemoPlayground wide>
    <div class="flex h-130 min-w-0 overflow-hidden rounded-z-lg bg-z-bg-layout">
      <ZSidebar
        :items="items"
        :collapse="collapse"
        :default-active="activeIndex"
        :default-openeds="['plugins']"
        navigation-label="示例导航"
        @select="handleSelect"
        @open="index => lastEvent = `open: ${index}`"
        @close="index => lastEvent = `close: ${index}`"
      >
        <template #brand-icon>
          <span class="grid size-11 place-items-center rounded-z bg-z-primary-container text-z-primary-on-container"><Box class="size-6" /></span>
        </template>
        <template #brand>
          <strong class="text-z-lg font-heavy">工作台</strong>
        </template>
        <template #footer>
          <div class="flex justify-end rounded-z bg-z-fill-quaternary p-1">
            <ZIconButton :aria-label="collapse ? '展开侧边栏' : '收起侧边栏'" @click="collapse = !collapse">
              <PanelLeftOpen v-if="collapse" />
              <PanelLeftClose v-else />
            </ZIconButton>
          </div>
        </template>
      </ZSidebar>
      <div class="grid min-w-0 flex-1 content-start gap-3 p-5">
        <strong class="text-z-lg">{{ activeLabel }}</strong>
        <output aria-label="菜单事件" class="break-words font-mono text-z-xs text-z-text-secondary">{{ lastEvent }}</output>
      </div>
    </div>
  </DemoPlayground>
</template>
