import type Scrollbar from './Scrollbar.vue'

export type ScrollbarDirection = 'top' | 'bottom' | 'left' | 'right'
export interface ScrollbarPosition {
  scrollTop: number
  scrollLeft: number
}

export type ScrollbarProps = InstanceType<typeof Scrollbar>['$props']
export type ScrollbarEmits = InstanceType<typeof Scrollbar>['$emit']
export type ScrollbarSlots = InstanceType<typeof Scrollbar>['$slots']
export type ScrollbarInstance = InstanceType<typeof Scrollbar>
