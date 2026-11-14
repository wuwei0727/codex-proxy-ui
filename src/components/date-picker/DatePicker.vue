<script setup lang="ts">
import type { DatePickerEmits, DatePickerProps, DatePickerSlots, DatePickerValue } from './types'
import { CalendarDays, Clock, X } from '@lucide/vue'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, provide, shallowRef, useAttrs, useTemplateRef } from 'vue'
import { localeKey } from '../../locale/context'
import { clearButtonClass } from '../../shared/utils/clear-button'
import Button from '../button/Button.vue'
import { useFormField } from '../form/composables/useFormField'
import { formFieldKey } from '../form/context'
import Input from '../input/Input.vue'
import { getInputClasses, inputFieldClass } from '../input/styles'
import Popover from '../popover/Popover.vue'
import DatePickerCalendar from './components/DatePickerCalendar.vue'
import { useDatePicker } from './composables/useDatePicker'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<DatePickerProps>(), {
  type: 'date',
  size: 'default',
  editable: true,
  clearable: true,
  rangeSeparator: '-',
  automaticDropdown: true,
  validateEvent: true,
  showFooter: true,
  showConfirm: true,
  teleported: true,
  placement: 'bottom-start',
  shortcuts: () => [],
})
const emit = defineEmits<DatePickerEmits>()
defineSlots<DatePickerSlots>()
const model = defineModel<DatePickerValue>()
const attrs = useAttrs()
const { controlId, invalid, describedBy, ariaRequired, required, rootAttrs, controlAttrs, validate } = useFormField(attrs)
provide(formFieldKey, null)
const {
  locale,
  type,
  range,
  time,
  view,
  open,
  draft,
  hover,
  selecting,
  input,
  anchors,
  blocked,
  needsConfirm,
  canConfirm,
  hasValue,
  handleOpen,
  handleClose,
  edit,
  applyInput,
  clear,
  pick,
  shortcut,
  confirm,
  updateTime,
  navigate,
} = useDatePicker(props, model, emit, () => validate('change'))
provide(localeKey, locale)
const inputs = useTemplateRef<HTMLInputElement[]>('inputs')
const calendars = useTemplateRef<InstanceType<typeof DatePickerCalendar>[]>('calendars')
const panel = useTemplateRef<HTMLElement>('panel')
const inputRoot = useTemplateRef<HTMLElement>('inputRoot')
const inputClasses = computed(() => getInputClasses(props.size, props.disabled, invalid.value, { open: open.value, trailing: Boolean(props.clearable && hasValue.value && !blocked.value) }))
const controlLabel = computed(() => typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : locale.value.datePicker.label)
const panelDates = computed(() => range.value && !props.singlePanel ? anchors.value : anchors.value.slice(0, 1))
const fields = computed(() => range.value ? [props.startPlaceholder ?? locale.value.datePicker.startPlaceholder, props.endPlaceholder ?? locale.value.datePicker.endPlaceholder] : [props.placeholder ?? locale.value.datePicker.placeholder])
const focus = () => inputs.value?.[0]?.focus()
const blur = () => inputs.value?.forEach(input => input.blur())
const restoringFocus = shallowRef(false)
defineExpose({ focus, blur, handleOpen, handleClose })
useEventListener(inputRoot, 'click', (event) => {
  event.stopPropagation()
  handleOpen()
  focus()
})
useEventListener(panel, 'keydown', (event) => {
  if (event.key !== 'Escape')
    return
  event.preventDefault()
  event.stopPropagation()
  restoringFocus.value = true
  handleClose()
  // 焦点返回不能触发 automaticDropdown 再次打开面板
  focus()
})

function onFocus(event: FocusEvent) {
  emit('focus', event)
  if (props.automaticDropdown && !restoringFocus.value)
    handleOpen()
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
  if (panel.value?.contains(event.relatedTarget as Node | null) || inputRoot.value?.contains(event.relatedTarget as Node | null))
    return
  applyInput()
  if (props.validateEvent)
    validate('blur')
}

async function keydown(event: KeyboardEvent) {
  if (event.isComposing)
    return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    handleOpen()
    await nextTick()
    calendars.value?.[0]?.focus()
  }
  else if (event.key === 'Enter') {
    event.preventDefault()
    if (open.value) {
      if (applyInput())
        confirm()
    }
    else {
      handleOpen()
    }
  }
  else if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    event.stopPropagation()
    handleClose()
  }
  else if (event.key === 'Tab' && !panel.value?.contains(event.target as Node)) {
    const fields = inputRoot.value?.querySelectorAll('input')
    if (range.value && event.target === fields?.[event.shiftKey ? 1 : 0])
      return
    applyInput()
    handleClose()
  }
}
</script>

<template>
  <Popover v-bind="rootAttrs" v-model="open" class="z-date-picker" transition="z-slide-fade" :data-type="type" :disabled="blocked" :placement="placement" :offset="10" :teleported="teleported" @open="restoringFocus = false" @close="restoringFocus = true" @closed="restoringFocus = false">
    <template #reference="{ id }">
      <div ref="inputRoot" class="relative inline-flex w-full items-center gap-2" :class="inputClasses">
        <component :is="prefixIcon || (time ? Clock : CalendarDays)" class="size-4 shrink-0" :class="disabled ? 'text-z-text-disabled' : invalid ? 'text-z-error' : 'text-z-text-quaternary'" />
        <template v-for="(placeholder, index) in fields" :key="index">
          <span v-if="index" class="shrink-0 text-z-xs text-z-text-tertiary"><slot name="range-separator">{{ rangeSeparator }}</slot></span>
          <input
            :id="index === 0 ? controlId : controlId ? `${controlId}-end` : undefined"
            ref="inputs"
            v-bind="controlAttrs"
            :value="input[index] ?? ''"
            :class="[inputFieldClass, range && 'w-0 text-center']"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly || !editable"
            :required="required"
            :aria-required="ariaRequired"
            :aria-invalid="invalid || undefined"
            :aria-describedby="describedBy"
            :aria-label="range ? (index === 0 ? locale.datePicker.startLabel : locale.datePicker.endLabel)(controlLabel) : typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : undefined"
            :aria-controls="open ? id : undefined"
            :aria-expanded="open"
            aria-haspopup="dialog"
            autocomplete="off"
            @input="!($event as InputEvent).isComposing && edit(($event.target as HTMLInputElement).value, index)"
            @compositionend="edit(($event.target as HTMLInputElement).value, index)"
            @focus="onFocus"
            @blur="onBlur"
            @click.stop="handleOpen"
            @keydown="keydown"
          >
        </template>
        <button v-if="clearable && hasValue && !blocked" type="button" :aria-label="locale.datePicker.clear" :class="clearButtonClass" @mousedown.prevent @click.stop="clear">
          <component :is="clearIcon || X" class="size-3.5" />
        </button>
      </div>
    </template>
    <div ref="panel" role="dialog" tabindex="-1" :aria-label="controlLabel" class="relative max-h-[min(36rem,80vh)] max-w-[calc(100vw-1rem)] overflow-auto" :class="popperClass" :style="popperStyle">
      <div class="flex flex-wrap">
        <div v-if="shortcuts.length" class="flex w-full flex-wrap gap-1 p-2 sm:w-28 sm:flex-col">
          <Button v-for="(item, index) in shortcuts" :key="index" variant="text" size="small" class="justify-start!" @click="shortcut(item)">
            {{ item.text }}
          </Button>
        </div>
        <div class="flex flex-wrap">
          <DatePickerCalendar
            v-for="(date, index) in panelDates"
            :key="index"
            ref="calendars"
            :date="date"
            :view="view"
            :selected="draft"
            :range="range"
            :week="type === 'week'"
            :selecting="selecting"
            :hover="hover"
            :disabled-date="disabledDate"
            :cell-class-name="cellClassName"
            :show-week-number="showWeekNumber || type === 'week'"
            @pick="pick"
            @cell-hover="hover = $event"
            @navigate="(date, mode) => navigate(date, mode, index)"
          >
            <template v-if="$slots.default" #default="cell">
              <slot v-bind="cell" />
            </template>
            <template v-if="$slots['prev-month']" #prev-month>
              <slot name="prev-month" />
            </template>
            <template v-if="$slots['next-month']" #next-month>
              <slot name="next-month" />
            </template>
            <template v-if="$slots['prev-year']" #prev-year>
              <slot name="prev-year" />
            </template>
            <template v-if="$slots['next-year']" #next-year>
              <slot name="next-year" />
            </template>
          </DatePickerCalendar>
        </div>
      </div>
      <div v-if="time" class="flex flex-wrap gap-3 px-3 py-2">
        <Input v-for="(_, index) in fields" :key="index" :model-value="draft[index]?.format('HH:mm:ss') ?? ''" type="time" step="1" size="small" class="min-w-32 flex-1" :aria-label="range ? index === 0 ? locale.datePicker.startTime : locale.datePicker.endTime : locale.datePicker.time" @change="updateTime($event, index)" />
      </div>
      <div v-if="needsConfirm && showFooter" class="flex justify-end p-2">
        <Button v-if="showConfirm" size="small" :disabled="!canConfirm" @click="confirm">
          {{ locale.common.confirm }}
        </Button>
      </div>
    </div>
  </Popover>
</template>
