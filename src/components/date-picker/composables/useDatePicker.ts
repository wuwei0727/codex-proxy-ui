import type { Dayjs } from 'dayjs'
import type { Ref } from 'vue'
import type { DatePickerEmits, DatePickerProps, DatePickerShortcut, DatePickerValue, DatePickerView } from '../types'
import { computed, shallowRef, watch } from 'vue'
import { useLocale } from '../../../locale/context'
import { availableDate, calendarLocales, dayjs, formatValue, parseDate, parseValue, pickerFormat, pickerView, sameValue, withTime } from '../utils/date'

type PickerEmit = <Event extends keyof DatePickerEmits>(event: Event, ...args: DatePickerEmits[Event]) => void

export function useDatePicker(props: Readonly<DatePickerProps>, model: Ref<DatePickerValue>, emit: PickerEmit, validate: () => void) {
  const type = computed(() => props.type ?? 'date')
  const locale = useLocale(() => props.locale)
  const calendarLocale = computed(() => calendarLocales[locale.value.name])
  const range = computed(() => type.value.endsWith('range'))
  const multiple = computed(() => ['dates', 'months', 'years', 'quarters'].includes(type.value))
  const time = computed(() => type.value.includes('time'))
  const view = computed(() => pickerView(type.value))
  const format = computed(() => props.format ?? pickerFormat(type.value, locale.value.datePicker.weekFormat))
  const open = shallowRef(false)
  const draft = shallowRef<Dayjs[]>([])
  const hover = shallowRef<Dayjs>()
  const selecting = shallowRef(false)
  const input = shallowRef<string[]>([])
  const inputDirty = shallowRef(false)
  const anchors = shallowRef<Dayjs[]>([])
  const selected = computed(() => parseValue(model.value, props.valueFormat, calendarLocale.value))
  const blocked = computed(() => props.disabled || props.readonly)
  const panelStep = computed(() => view.value === 'date' ? 'month' : 'year')
  const panelAmount = computed(() => view.value === 'year' ? 10 : 1)
  const needsConfirm = computed(() => time.value || multiple.value)
  let changeBaseline: DatePickerValue
  const noPendingValue = Symbol('no-pending-value')
  let pendingValue: DatePickerValue | typeof noPendingValue = noPendingValue

  function display(dates: Dayjs[]) {
    const values = dates.map(date => date.format(format.value))
    return range.value ? [values[0] ?? '', values[1] ?? ''] : [values.join(', ')]
  }

  function resetInput() {
    input.value = display(draft.value)
    inputDirty.value = false
  }

  function resetDraft() {
    draft.value = selected.value
    selecting.value = false
    hover.value = undefined
    resetInput()
  }

  function resetPanels() {
    const defaults = parseValue(props.defaultValue, undefined, calendarLocale.value)
    const left = selected.value[0] ?? defaults[0] ?? dayjs().locale(calendarLocale.value)
    const next = left.add(panelAmount.value, panelStep.value)
    const end = selected.value[1] ?? defaults[1]
    anchors.value = [left, props.unlinkPanels && end?.isAfter(left, panelStep.value) ? end : next]
  }

  function notifyChange() {
    const value = pendingValue === noPendingValue ? model.value : pendingValue
    if (!sameValue(value, changeBaseline)) {
      emit('change', value)
      validate()
      changeBaseline = value
    }
  }

  function valid(dates: Dayjs[]) {
    if (!dates.length || (range.value && dates.length !== 2) || (!range.value && !multiple.value && dates.length !== 1))
      return false
    return dates.every(date => date.isValid() && !props.disabledDate?.(date.toDate()))
      && (!range.value || !dates[0]!.isAfter(dates[1]!))
  }

  function publish(dates: Dayjs[]) {
    const values = dates.map(date => formatValue(date, props.valueFormat))
    const next = range.value || multiple.value ? values : values[0]
    if (!sameValue(model.value, next)) {
      // defineModel 的父级回写可能晚于面板关闭，保留待确认值区分用户选择与外部赋值
      pendingValue = next
      model.value = next
    }
    if (!open.value)
      notifyChange()
  }

  function handleOpen() {
    if (blocked.value || open.value)
      return
    resetDraft()
    resetPanels()
    changeBaseline = model.value
    open.value = true
  }

  function handleClose() {
    open.value = false
  }

  function edit(value: string, index: number) {
    input.value = input.value.map((item, i) => i === index ? value : item)
    inputDirty.value = true
  }

  function applyInput() {
    if (!inputDirty.value || blocked.value)
      return true
    if (input.value.every(value => !value.trim())) {
      clear()
      return true
    }
    const values = multiple.value ? input.value[0]!.split(',').map(value => value.trim()).filter(Boolean) : input.value
    const dates = values.map(value => parseDate(value, format.value, calendarLocale.value))
    if (!dates.every((date): date is Dayjs => Boolean(date)) || !valid(dates)) {
      resetInput()
      return false
    }
    draft.value = dates
    selecting.value = false
    publish(dates)
    resetInput()
    resetPanels()
    return true
  }

  function clear() {
    if (blocked.value)
      return
    if (!open.value)
      changeBaseline = model.value
    const next = typeof props.valueOnClear === 'function' ? props.valueOnClear() : props.valueOnClear ?? null
    pendingValue = next
    model.value = next
    resetDraft()
    inputDirty.value = false
    emit('clear')
    notifyChange()
    handleClose()
  }

  function selectionTime(date: Dayjs, index: number) {
    const defaults = Array.isArray(props.defaultTime) ? props.defaultTime : [props.defaultTime, props.defaultTime]
    return withTime(date, time.value ? draft.value[index] ?? defaults[index] : defaults[index])
  }

  function pick(date: Dayjs) {
    if (blocked.value)
      return
    const available = availableDate(date, view.value, props.disabledDate)
    if (!available)
      return
    if (range.value) {
      if (!selecting.value) {
        draft.value = [selectionTime(available, 0)]
        selecting.value = true
        hover.value = undefined
        emit('calendarChange', [draft.value[0]!.toDate(), null])
      }
      else {
        const ordered = [draft.value[0]!, available].sort((a, b) => a.valueOf() - b.valueOf())
        draft.value = ordered.map((value, index) => selectionTime(value, index))
        selecting.value = false
        hover.value = undefined
        emit('calendarChange', [draft.value[0]!.toDate(), draft.value[1]!.toDate()])
        if (valid(draft.value)) {
          publish(draft.value)
          if (!time.value)
            handleClose()
        }
      }
    }
    else if (multiple.value) {
      const existing = draft.value.findIndex(value => value.isSame(available, view.value === 'date' ? 'day' : view.value))
      draft.value = existing < 0 ? [...draft.value, available] : draft.value.filter((_, index) => index !== existing)
      publish(draft.value)
    }
    else {
      draft.value = [type.value === 'week' ? available.startOf('week') : selectionTime(available, 0)]
      if (valid(draft.value)) {
        publish(draft.value)
        if (!time.value)
          handleClose()
      }
    }
    resetInput()
  }

  function shortcut(item: DatePickerShortcut) {
    if (blocked.value)
      return
    const dates = parseValue(typeof item.value === 'function' ? item.value() : item.value, undefined, calendarLocale.value)
    if (!valid(dates))
      return
    draft.value = dates
    selecting.value = false
    publish(dates)
    resetInput()
    handleClose()
  }

  function confirm() {
    if (blocked.value || !applyInput() || selecting.value)
      return
    if (valid(draft.value) || (multiple.value && !draft.value.length)) {
      publish(draft.value)
      handleClose()
    }
  }

  function updateTime(value: string, index: number) {
    const parsed = parseDate(value, value.length === 5 ? 'HH:mm' : 'HH:mm:ss', calendarLocale.value)
    if (!parsed || blocked.value)
      return
    const date = draft.value[index] ?? anchors.value[index]!
    draft.value = Array.from({ length: Math.max(draft.value.length, index + 1) }, (_, i) =>
      i === index ? withTime(date, parsed) : draft.value[i] ?? withTime(anchors.value[i]!, undefined))
    if (valid(draft.value) && !selecting.value)
      publish(draft.value)
    resetInput()
  }

  function navigate(date: Dayjs, mode: DatePickerView, index: number) {
    if (props.unlinkPanels || props.singlePanel || !range.value) {
      anchors.value = anchors.value.map((value, i) => i === index ? date : value)
      if (range.value && !anchors.value[1]!.isAfter(anchors.value[0]!, panelStep.value)) {
        const other = index === 0 ? 1 : 0
        anchors.value = anchors.value.map((value, i) => i === other ? date.add((index === 0 ? 1 : -1) * panelAmount.value, panelStep.value) : value)
      }
    }
    else {
      const left = index === 0 ? date : date.subtract(panelAmount.value, panelStep.value)
      anchors.value = [left, left.add(panelAmount.value, panelStep.value)]
    }
    emit('panelChange', range.value ? anchors.value.map(value => value.toDate()) : date.toDate(), mode, mode)
  }

  watch(model, (value) => {
    if (pendingValue !== noPendingValue && sameValue(value, pendingValue)) {
      pendingValue = noPendingValue
    }
    else {
      pendingValue = noPendingValue
      changeBaseline = value
    }
    resetDraft()
  }, { immediate: true })
  watch([type, () => props.valueFormat, () => props.format], resetDraft)
  watch(open, (visible) => {
    if (!visible) {
      applyInput()
      notifyChange()
      resetDraft()
    }
    emit('visibleChange', visible)
  })
  watch(blocked, (value) => {
    if (value) {
      inputDirty.value = false
      handleClose()
    }
  })
  watch(type, () => {
    handleClose()
    resetPanels()
  })
  watch(calendarLocale, (value) => {
    // 语言变化只重绘日期文本，保留打开状态、未提交选择和输入。
    draft.value = draft.value.map(date => date.locale(value))
    anchors.value = anchors.value.map(date => date.locale(value))
    hover.value = hover.value?.locale(value)
    if (!inputDirty.value)
      resetInput()
  })
  resetPanels()

  return {
    locale,
    type,
    range,
    multiple,
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
    canConfirm: computed(() => !selecting.value && (valid(draft.value) || (multiple.value && !draft.value.length))),
    hasValue: computed(() => selected.value.length > 0),
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
  }
}
