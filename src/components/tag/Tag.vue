<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import { X } from '@lucide/vue'
import { computed, useId } from 'vue'
import { useLocale } from '../../locale/context'
import { useComponentSize } from '../../shared/size'

const props = withDefaults(defineProps<{
  type?: TagType
  size?: ComponentSize
  round?: boolean
  closable?: boolean
  disabled?: boolean
  closeLabel?: string
}>(), {
  type: 'default',
  round: false,
  closable: false,
  disabled: false,
  closeLabel: undefined,
})
// 关闭只通知调用方，由调用方决定是否移除标签。
defineEmits<{ close: [event: MouseEvent] }>()

defineSlots<{ default: () => unknown }>()

const componentSize = useComponentSize(() => props.size)

const locale = useLocale()

type TagType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

const contentId = useId()
const closeId = useId()

const typeClasses: Record<TagType, string> = {
  default: 'bg-z-fill-tertiary text-z-text-secondary',
  primary: 'bg-z-primary-container text-z-primary-on-container',
  success: 'bg-z-success-container text-z-success-on-container',
  info: 'bg-z-info-container text-z-info-on-container',
  warning: 'bg-z-warning-container text-z-warning-on-container',
  danger: 'bg-z-error-container text-z-error-on-container',
}
const sizeClasses: Record<ComponentSize, string> = {
  small: 'min-h-5 gap-1 px-1.5 py-0.5 text-z-xs',
  default: 'min-h-6 gap-1.5 px-2 py-0.5 text-z-xs',
  large: 'min-h-7 gap-2 px-2.5 py-1 text-z-sm',
}
const classes = computed(() => [
  sizeClasses[componentSize.value],
  props.round ? 'rounded-full' : 'rounded-z',
  props.disabled ? 'bg-z-bg-container-disabled text-z-text-disabled' : typeClasses[props.type],
])
</script>

<template>
  <span class="inline-flex w-fit max-w-full min-w-0 items-center align-middle font-emphasis leading-snug" :class="classes">
    <span :id="closable ? contentId : undefined" class="min-w-0 wrap-anywhere">
      <slot />
    </span>
    <button
      v-if="closable"
      type="button"
      :disabled="disabled"
      :aria-label="closeLabel"
      :aria-labelledby="closeLabel ? undefined : `${closeId} ${contentId}`"
      class="inline-grid size-4 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-inherit outline-none transition-colors duration-150 hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-z-control-outline active:bg-current/20 disabled:cursor-not-allowed disabled:hover:bg-transparent motion-reduce:transition-none"
      @click.stop="$emit('close', $event)"
    >
      <span :id="closeId" class="sr-only">{{ locale.common.remove }}</span>
      <X class="size-3" aria-hidden="true" />
    </button>
  </span>
</template>
