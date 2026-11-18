<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { choiceLabelClasses, useComponentSize } from '../../shared/size'
import { useFormField } from '../form/composables/useFormField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    size?: ComponentSize
    validateEvent?: boolean
    label?: string
    disabled?: boolean
    activeText?: string
    inactiveText?: string
    inlinePrompt?: boolean
    width?: string | number
  }>(),
  {
    validateEvent: true,
    disabled: false,
    activeText: '',
    inactiveText: '',
    inlinePrompt: false,
    width: '',
  },
)
const emit = defineEmits<{ change: [value: boolean], focus: [event: FocusEvent], blur: [event: FocusEvent] }>()

const componentSize = useComponentSize(() => props.size)

const model = defineModel<boolean>({ default: false })
const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('input')
defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })
const { controlId, invalid, describedBy, required, ariaRequired, rootAttrs, controlAttrs, validate } = useFormField(attrs, () => props.validateEvent)
const hasStateText = computed(() => Boolean(props.activeText || props.inactiveText))
const inlineText = computed(() => model.value ? props.activeText : props.inactiveText)
const trackStyle = computed(() => props.width === ''
  ? undefined
  : {
      width: typeof props.width === 'number' || /^\d+(?:\.\d+)?$/.test(props.width)
        ? `${props.width}px`
        : props.width,
    })

const trackClasses = computed(() => [
  { small: 'h-5 min-w-9 [--thumb:1rem]', default: 'h-6 min-w-11 [--thumb:1.25rem]', large: 'h-7 min-w-13 [--thumb:1.5rem]' }[componentSize.value],
  'relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-[background-color,box-shadow] duration-180 motion-reduce:transition-none',
  props.disabled
    ? 'bg-z-bg-container-disabled shadow-none'
    : invalid.value
      ? model.value ? 'bg-z-error' : 'bg-z-error-container shadow-[inset_0_0_0_1px_var(--z-color-error)]'
      : model.value
        ? 'bg-z-primary shadow-z-tertiary'
        : 'bg-(--z-switch-unchecked-bg) shadow-z-tertiary',
])
const thumbClasses = computed(() => [
  'absolute top-0.5 z-10 size-(--thumb) rounded-full bg-z-white shadow-z-tertiary transition-[left] duration-180 ease-out motion-reduce:transition-none',
  model.value ? 'left-[calc(100%-var(--thumb)-0.125rem)]' : 'left-0.5',
])
const inlineTextClasses = computed(() => [
  'pointer-events-none absolute inset-0 flex min-w-0 select-none items-center justify-center overflow-hidden text-[10px] leading-none font-heavy transition-[padding,color] duration-180 motion-reduce:transition-none',
  model.value ? 'text-z-white' : props.disabled ? 'text-z-text-secondary' : 'text-(--z-switch-unchecked-color)',
  model.value ? 'pr-[calc(var(--thumb)+0.25rem)] pl-1' : 'pr-1 pl-[calc(var(--thumb)+0.25rem)]',
])
const inactiveTextClasses = computed(() => [
  'leading-none font-emphasis transition-colors duration-150 motion-reduce:transition-none',
  model.value ? 'text-z-text-secondary' : 'text-z-primary-text',
])
const activeTextClasses = computed(() => [
  'leading-none font-emphasis transition-colors duration-150 motion-reduce:transition-none',
  model.value ? 'text-z-primary-text' : 'text-z-text-secondary',
])
</script>

<template>
  <!-- 原生控件嵌套在标签内，整行保持同一点击目标 -->
  <!-- eslint-disable-next-line vue-a11y/label-has-for -->
  <label
    v-bind="rootAttrs"
    class="relative inline-flex items-center"
    :class="[choiceLabelClasses[componentSize], disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer']"
  >
    <span v-if="inactiveText && !inlinePrompt" :class="inactiveTextClasses">
      {{ inactiveText }}
    </span>
    <input
      v-bind="controlAttrs"
      :id="controlId"
      ref="input"
      v-model="model"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :required="required"
      :aria-required="ariaRequired"
      type="checkbox"
      role="switch"
      class="peer sr-only"
      :aria-label="typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : label"
      :disabled="disabled"
      @change="emit('change', ($event.target as HTMLInputElement).checked); validate('change')"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event); validate('blur')"
    >
    <span
      :class="trackClasses"
      :style="trackStyle"
      class="peer-focus-visible:ring-2 peer-focus-visible:ring-z-control-outline peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-z-bg-container"
    >
      <span v-if="inlinePrompt && inlineText" :class="inlineTextClasses">
        <span class="min-w-0 truncate">{{ inlineText }}</span>
      </span>
      <span :class="thumbClasses" />
    </span>
    <span v-if="activeText && !inlinePrompt" :class="activeTextClasses">{{ activeText }}</span>
    <span v-else-if="label && !hasStateText" class="font-emphasis text-z-text">
      {{ label }}
    </span>
  </label>
</template>
