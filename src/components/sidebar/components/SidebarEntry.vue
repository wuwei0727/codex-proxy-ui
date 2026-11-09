<script setup lang="ts">
import type { SidebarChildItem } from '../types'
import { ChevronDown } from '@lucide/vue'
import Popover from '../../popover/Popover.vue'

withDefaults(defineProps<{
  item: SidebarChildItem
  active: boolean
  collapsed: boolean
  nested?: boolean
  expandable?: boolean
  expanded?: boolean
  controls?: string
  disabled?: boolean
  feedbackMuted: boolean
}>(), {
  nested: false,
  expandable: false,
  expanded: false,
  disabled: false,
})

const emit = defineEmits<{
  activate: []
}>()
</script>

<template>
  <Popover trigger="hover" placement="right" role="tooltip" :show-after="800" :disabled="!collapsed" :enterable="false" class="relative z-10 w-full">
    <template #reference="{ close }">
      <button
        type="button"
        :data-sidebar-index="item.index"
        class="relative inline-flex w-full cursor-pointer items-center rounded-z border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-z-control-outline disabled:cursor-not-allowed disabled:text-z-text-disabled motion-reduce:transition-none"
        :class="[
          nested ? 'h-10 gap-2 px-3 text-left text-z-sm' : 'h-11.5 text-sm leading-[1.15]',
          collapsed ? 'justify-center' : nested ? '' : 'gap-3 px-4',
          active ? 'font-bold text-z-text' : 'font-semibold text-z-text-secondary',
          feedbackMuted ? 'transition-none' : 'transition-colors duration-200',
          !active && !feedbackMuted && !item.disabled && !disabled ? 'hover:bg-z-fill-quaternary hover:text-z-text' : undefined,
        ]"
        :disabled="disabled || item.disabled"
        :aria-label="collapsed ? item.label : undefined"
        :aria-current="active && !expandable ? 'page' : undefined"
        :aria-expanded="expandable && !collapsed ? expanded : undefined"
        :aria-controls="expandable && !collapsed ? controls : undefined"
        @click="close(); emit('activate')"
      >
        <component :is="item.icon" v-if="item.icon" class="shrink-0" :size="nested ? 16 : 20" />
        <span
          data-sidebar-label
          class="min-w-0 overflow-hidden whitespace-nowrap text-left motion-reduce:transition-none"
          :class="[
            collapsed ? 'pointer-events-none w-0' : 'flex-1 truncate',
            nested ? undefined : 'transition-[opacity,transform] duration-200',
          ]"
          :aria-hidden="collapsed || undefined"
        >
          {{ item.label }}
        </span>
        <ChevronDown
          v-if="expandable && !collapsed"
          class="size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none"
          :class="expanded ? undefined : '-rotate-90'"
        />
      </button>
    </template>
    <span class="block px-3 py-2 text-z-sm whitespace-nowrap">{{ item.label }}</span>
  </Popover>
</template>
