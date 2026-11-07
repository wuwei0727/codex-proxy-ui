<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import type { ButtonProps } from '../button/types'
import { LoaderCircle, setLucideProps, useLucideProps } from '@lucide/vue'
import { computed, useTemplateRef } from 'vue'
import { buttonSurface } from '../button/utils/surface'

const props = withDefaults(
  defineProps<ButtonProps & { ariaLabel?: string, pressed?: boolean }>(),
  {
    variant: 'text',
    size: 'default',
    loading: false,
    disabled: false,
    pressed: false,
    type: 'default',
    nativeType: 'button',
  },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()

defineSlots<{
  loading?: () => unknown
  default: () => unknown
}>()

const sizeClasses: Record<ComponentSize, string> = {
  small: 'size-z-control-sm',
  default: 'size-z-control',
  large: 'size-z-control-lg',
}

const iconSizes: Record<ComponentSize, number> = {
  small: 14,
  default: 16,
  large: 18,
}

// 只提供默认值，保留图标自身的 size 和尺寸类，避免 CSS 覆盖调用方设置。
setLucideProps({
  ...useLucideProps(),
  get size() {
    return iconSizes[props.size]
  },
})

const buttonRef = useTemplateRef<HTMLButtonElement>('button')
defineExpose({ focus: () => buttonRef.value?.focus(), blur: () => buttonRef.value?.blur(), get element() {
  return buttonRef.value
} })

const classes = computed(() => [
  'inline-grid shrink-0 touch-manipulation place-items-center rounded-z border-0 leading-none outline-none transition-[background-color,box-shadow,color,opacity,transform] duration-150 motion-safe:active:scale-[0.96] motion-reduce:transition-none',
  'focus-visible:ring-2 focus-visible:ring-z-control-outline focus-visible:ring-offset-2 focus-visible:ring-offset-z-bg-container',
  'disabled:cursor-not-allowed disabled:transform-none disabled:bg-z-bg-container-disabled disabled:text-z-text-disabled disabled:shadow-none',
  sizeClasses[props.size],
  buttonSurface(props.type, props.variant, true),
  props.pressed ? 'bg-z-bg-text-active text-z-text' : undefined,
])
</script>

<template>
  <button
    ref="button"
    :type="nativeType"
    :class="classes"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-pressed="pressed || undefined"
    :aria-busy="loading || undefined"
    @click="emit('click', $event)"
  >
    <span
      v-if="loading"
      class="inline-grid place-items-center [&>svg]:block [&>svg]:origin-center [&>svg]:transform-view [&>svg]:will-change-transform"
    >
      <slot name="loading">
        <LoaderCircle class="animate-spin motion-reduce:animate-none" />
      </slot>
    </span>
    <span v-else class="inline-grid place-items-center">
      <slot />
    </span>
  </button>
</template>
