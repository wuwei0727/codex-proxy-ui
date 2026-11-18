<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ComponentSize } from '../../shared/types'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useLocale } from '../../locale/context'
import { useComponentSize } from '../../shared/size'
import { useFormField } from '../form/composables/useFormField'

const props = withDefaults(
  defineProps<{
    size?: ComponentSize
    validateEvent?: boolean
    min?: number
    max?: number
    step?: number
    unit?: string
    disabled?: boolean
  }>(),
  {
    validateEvent: true,
    min: 0,
    max: 100,
    step: 1,
    unit: undefined,
    disabled: false,
  },
)
const emit = defineEmits<{ input: [value: number], change: [value: number], focus: [event: FocusEvent], blur: [event: FocusEvent] }>()

const componentSize = useComponentSize(() => props.size)

const locale = useLocale()

const model = defineModel<number>({ required: true })
const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('input')
const { controlId, describedBy, invalid, ariaRequired, validate } = useFormField(attrs, () => props.validateEvent)
defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })

const rangeStyle = computed<CSSProperties>(() => {
  const span = props.max - props.min
  const progress = span > 0 ? ((model.value - props.min) / span) * 100 : 0
  return {
    '--z-slider-progress': `${Math.min(100, Math.max(0, progress))}%`,
  }
})

const valueText = computed(() => `${model.value}${props.unit ?? ''}`)

function updateModel(event: Event) {
  const value = (event.target as HTMLInputElement).valueAsNumber
  if (Number.isFinite(value)) {
    model.value = value
    emit('input', value)
  }
}
</script>

<template>
  <input
    :id="controlId"
    ref="input"
    :value="model"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :aria-label="typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : locale.common.value"
    :aria-describedby="describedBy"
    :aria-invalid="invalid || undefined"
    :aria-required="ariaRequired"
    :aria-valuetext="valueText"
    class="z-slider w-full"
    :class="{ small: 'h-4 [--thumb:12px]', default: 'h-5 [--thumb:14px]', large: 'h-6 [--thumb:18px]' }[componentSize]"
    :style="rangeStyle"
    @input="updateModel"
    @change="emit('change', ($event.target as HTMLInputElement).valueAsNumber); validate('change')"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event); validate('blur')"
  >
</template>

<style scoped>
.z-slider {
  appearance: none;
  cursor: pointer;
  background: transparent;
  outline: none;
}

.z-slider[aria-invalid='true']:enabled {
  --slider-accent: var(--z-color-error);
}

.z-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--slider-accent, var(--z-color-primary)) 0 var(--z-slider-progress),
    var(--z-color-fill-secondary) var(--z-slider-progress) 100%
  );
}

.z-slider::-webkit-slider-thumb {
  width: var(--thumb);
  height: var(--thumb);
  margin-top: calc((4px - var(--thumb)) / 2);
  appearance: none;
  border: 2px solid var(--z-color-bg-container);
  border-radius: 999px;
  background: var(--slider-accent, var(--z-color-primary));
  transition:
    box-shadow 150ms ease,
    transform 150ms ease;
}

.z-slider::-moz-range-track {
  height: 4px;
  border-radius: 999px;
  background: var(--z-color-fill-secondary);
}

.z-slider::-moz-range-progress {
  height: 4px;
  border-radius: 999px;
  background: var(--slider-accent, var(--z-color-primary));
}

.z-slider::-moz-range-thumb {
  width: calc(var(--thumb) - 4px);
  height: calc(var(--thumb) - 4px);
  border: 2px solid var(--z-color-bg-container);
  border-radius: 999px;
  background: var(--slider-accent, var(--z-color-primary));
  transition:
    box-shadow 150ms ease,
    transform 150ms ease;
}

.z-slider:hover::-webkit-slider-thumb {
  transform: scale(1.08);
}

.z-slider:hover::-moz-range-thumb {
  transform: scale(1.08);
}

.z-slider:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--z-color-primary-container-hover);
}

.z-slider:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 3px var(--z-color-primary-container-hover);
}

.z-slider:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (prefers-reduced-motion: reduce) {
  .z-slider::-webkit-slider-thumb {
    transition: none;
  }

  .z-slider::-moz-range-thumb {
    transition: none;
  }
}
</style>
