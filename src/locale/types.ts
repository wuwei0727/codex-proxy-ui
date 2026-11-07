import type { ThemeColorPresetId } from '../theme/types'

export interface UiLocale {
  theme: Record<ThemeColorPresetId, { label: string, description: string }>
  name: 'en' | 'zh-Hans' | 'zh-Hant'
  common: {
    confirm: string
    cancel: string
    close: string
    remove: string
    loading: string
    empty: string
    value: string
  }
  markdown: {
    copy: string
    copied: string
    copyFailed: string
  }
  pagination: {
    total: (count: number) => string
    pageSize: (count: number) => string
    sizeLabel: string
    label: string
    previous: string
    next: string
  }
  select: {
    placeholder: string
    empty: string
    clear: string
    search: string
    searchPlaceholder: string
    noMatches: string
    remove: (label: string) => string
    more: (count: number) => string
    remaining: string
  }
  inputNumber: {
    decrease: (label: string) => string
    increase: (label: string) => string
  }
  input: {
    clear: string
    content: string
    show: (label: string) => string
    hide: (label: string) => string
  }
  form: {
    required: string
    requiredMessage: string
    invalidMessage: string
  }
  dialog: {
    close: string
  }
  notification: {
    success: string
    error: string
    warning: string
    info: string
    close: (title: string) => string
  }
  datePicker: {
    label: string
    placeholder: string
    startPlaceholder: string
    endPlaceholder: string
    startLabel: (label: string) => string
    endLabel: (label: string) => string
    clear: string
    time: string
    startTime: string
    endTime: string
    previousYear: string
    previousMonth: string
    nextMonth: string
    nextYear: string
    chooseYear: string
    chooseMonth: string
    week: string
    weekFormat: string
  }
  colorPicker: {
    label: string
    rgbaError: string
    hexError: string
    saturationBrightness: string
    saturationBrightnessValue: (saturation: number, brightness: number) => string
    hue: string
    opacity: string
    opacityValue: (value: number) => string
    presets: string
    rgba: string
    hex: string
  }
  table: {
    ascending: (label: string) => string
    descending: (label: string) => string
    clearSort: (label: string) => string
    columns: string
    columnList: string
    columnInstructions: string
    moveColumn: (label: string) => string
    movedColumn: (label: string, position: number) => string
    reset: string
    resizeColumn?: string
  }
}
