import type { ComponentSize } from '../../shared/types'
import type Pagination from './Pagination.vue'

export interface PaginationState {
  currentPage: number
  pageSize: number
  total: number
  pageSizes?: number[]
}

export interface PaginationProps {
  size?: ComponentSize
  hideOnSinglePage?: boolean
  total: number
  pageSizes?: number[]
  disabled?: boolean
}
export type PaginationEmits = InstanceType<typeof Pagination>['$emit']
export type PaginationSlots = InstanceType<typeof Pagination>['$slots']
