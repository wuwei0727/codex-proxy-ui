import type { ComponentSize } from '../../shared/types'

import type Table from './Table.vue'
import type TableColumnSettings from './TableColumnSettings.vue'

export type TableRow = object

export type TableColumnKind
  = | 'text'
    | 'identity'
    | 'meta'
    | 'status'
    | 'numeric'
    | 'datetime'
    | 'mono'
    | 'index'
    | 'selection'
    | 'expander'
    | 'actions'
    | 'custom'

export type TableColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export type TableColumnAlign = 'left' | 'right' | 'center'
type TableColumnSticky = 'left' | 'right'

export interface TableColumn<Row extends TableRow = TableRow> {
  key: string
  label?: string
  kind?: TableColumnKind
  size?: TableColumnSize
  fixedWidth?: boolean
  width?: number
  minWidth?: number
  fixed?: boolean | 'left' | 'right'
  align?: TableColumnAlign
  headerAlign?: TableColumnAlign
  sortable?: boolean | string
  /** 列设置中是否允许隐藏；false 时始终保留。 */
  hideable?: boolean
  /** 未保存用户偏好时，列设置使用此默认值。 */
  defaultHidden?: boolean
  formatter?: (value: unknown, row: Row) => unknown
  emptyText?: string
  paddingClass?: string
}

export interface TableSort {
  key: string
  direction: 'asc' | 'desc'
}

export interface TableColumnOption {
  key: string
  label: string
  visible: boolean
  disabled: boolean
  reorderable: boolean
}

export interface TableEmits {
  sortChange: [sort: TableSort | undefined]
  columnResize: [payload: { key: string, width: number }]
  columnResetWidth: [key: string]
}

export type TableSlots<Row extends TableRow = TableRow> = NonNullable<Parameters<typeof Table<Row>>[1]>['slots']

export interface TableProps<Row extends TableRow> {
  columns: TableColumn<Row>[]
  data: Row[]
  rowKey?: string | ((row: Row, index: number) => string | number)
  selectedRowKeys?: Array<string | number>
  expandedRowKeys?: Array<string | number>
  size?: ComponentSize
  loading?: boolean
  emptyText?: string
  showHeaderWhenEmpty?: boolean
  scrollbarAlwaysVisible?: boolean
  sort?: TableSort
  tableId?: string
  resizable?: boolean
  headerAlign?: TableColumnAlign
}

export interface ResolvedTableColumn<Row extends TableRow = TableRow>
  extends TableColumn<Row> {
  kind: TableColumnKind
  basisWidth: number
  fixedWidth: boolean
  align: TableColumnAlign
  truncate: boolean
  contentClass?: string
  paddingClass?: string
  sticky?: TableColumnSticky
  stickyOffset?: number
}

export type TableColumnSettingsProps = InstanceType<typeof TableColumnSettings>['$props']
export type TableColumnSettingsEmits = InstanceType<typeof TableColumnSettings>['$emit']
export type TableColumnSettingsSlots = InstanceType<typeof TableColumnSettings>['$slots']
export type TableColumnSettingsInstance = InstanceType<typeof TableColumnSettings>
