<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue'
import { computed, inject } from 'vue'
import { dropdownSelectKey } from '../dropdown/context'

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'danger'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'default',
    disabled: false,
    loading: false,
  },
)

defineSlots<{
  icon?: () => unknown
  loading?: () => unknown
  default: () => unknown
}>()

const select = inject(dropdownSelectKey, undefined)
const classes = computed(() => [
  'flex min-h-9 w-full touch-manipulation items-center gap-2 rounded-z-sm border-0 bg-transparent px-3 text-left text-z leading-none font-emphasis outline-none transition-[background-color,color] duration-150 motion-reduce:transition-none',
  'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-z-control-outline',
  'disabled:cursor-not-allowed disabled:text-z-text-disabled',
  props.type === 'danger'
    ? 'text-z-error-text hover:bg-z-error-container-hover hover:text-z-error-on-container'
    : 'text-z-text hover:bg-z-bg-text-hover',
])
</script>

<template>
  <button type="button" :role="select ? 'menuitem' : undefined" :tabindex="select ? -1 : undefined" :class="classes" :disabled="disabled || loading" :aria-busy="loading || undefined" @click="select?.()">
    <span v-if="loading" class="inline-grid size-3.5 shrink-0 place-items-center">
      <slot name="loading">
        <LoaderCircle class="size-3.5 animate-spin motion-reduce:animate-none" />
      </slot>
    </span>
    <span v-else-if="$slots.icon" class="inline-grid shrink-0 place-items-center">
      <slot name="icon" />
    </span>
    <span class="min-w-0 flex-1 truncate"><slot /></span>
  </button>
</template>
