<script setup lang="ts" generic="Row extends object = Record<string, unknown>">
import type { ResolvedTableColumn, TableEmits, TableProps } from './types'
import { Triangle } from '@lucide/vue'
import { useResizeObserver } from '@vueuse/core'

import { computed, nextTick, onMounted, shallowRef, useSlots, useTemplateRef, watch } from 'vue'
import { useLocale } from '../../locale/context'
import { useComponentSize } from '../../shared/size'
import Empty from '../empty/Empty.vue'
import Scrollbar from '../scrollbar/Scrollbar.vue'
import { useTableColumnMotion } from './composables/useTableColumnMotion'
import { useTableExpandMotion } from './composables/useTableExpandMotion'
import {
  alignClass,
  cellContentClass,
  cellDisplayValue,
  cellTitle,
  cellValue,
  columnSortKey,
  columnStyle,
  resolveColumns,
  stickyStyle,
  tableStyle,
} from './utils/columns'

const props = withDefaults(defineProps<TableProps<Row>>(), {
  rowKey: 'id',
  stripe: true,
  selectedRowKeys: () => [],
  expandedRowKeys: () => [],
  loading: false,
  showHeaderWhenEmpty: false,
  scrollbarAlwaysVisible: false,
  sort: undefined,
})
const emit = defineEmits<TableEmits>()

const componentSize = useComponentSize(() => props.size)

const locale = useLocale()

const slots = useSlots()
const computedColumns = computed(() => resolveColumns(props.columns))
const resolvedTableStyle = computed(() => tableStyle(computedColumns.value))

const retainedRows = shallowRef<Row[]>([])
watch(
  [() => props.data, () => props.loading],
  ([rows, loading]) => {
    if (rows.length > 0 || !loading)
      retainedRows.value = rows
  },
  { immediate: true },
)
const displayRows = computed(() => (props.loading && props.data.length === 0 ? retainedRows.value : props.data))
const hasRows = computed(() => displayRows.value.length > 0)

const scrollbarRef = useTemplateRef<InstanceType<typeof Scrollbar>>('scrollbar')
const tableRef = useTemplateRef<HTMLTableElement>('table')
useTableColumnMotion(tableRef, () => computedColumns.value.map(column => column.key))
const expandMotion = useTableExpandMotion()
const horizontalScrolled = shallowRef(false)
const horizontalCanScrollRight = shallowRef(false)

function updateScrollLayout() {
  scrollbarRef.value?.update()
  const wrap = scrollbarRef.value?.wrapRef
  if (!wrap) {
    horizontalScrolled.value = false
    horizontalCanScrollRight.value = false
    return
  }
  const range = Math.max(wrap.scrollWidth - wrap.clientWidth, 0)
  horizontalScrolled.value = wrap.scrollLeft > 1
  horizontalCanScrollRight.value = wrap.scrollLeft < range - 1
}

function handleTableScroll(payload: { scrollTop: number, scrollLeft: number }) {
  const wrap = scrollbarRef.value?.wrapRef
  if (!wrap)
    return
  const range = Math.max(wrap.scrollWidth - wrap.clientWidth, 0)
  horizontalScrolled.value = payload.scrollLeft > 1
  horizontalCanScrollRight.value = payload.scrollLeft < range - 1
}

onMounted(async () => {
  await nextTick()
  updateScrollLayout()
})
useResizeObserver(() => [scrollbarRef.value?.wrapRef, tableRef.value].filter(Boolean), updateScrollLayout)
watch([() => displayRows.value.length, () => props.columns], async () => {
  await nextTick()
  updateScrollLayout()
})

// 空态遮罩和滚动条沿用表头高度，单元格内容沿用行高，切换密度时保持对齐
const tableSizeClasses = {
  small: '[--table-header-height:2rem] [--table-row-height:var(--z-table-row-height-sm)] [--table-row-gap:4px]',
  default: '[--table-header-height:2.5rem] [--table-row-height:var(--z-table-row-height)] [--table-row-gap:6px]',
  large: '[--table-header-height:3rem] [--table-row-height:var(--z-table-row-height-lg)] [--table-row-gap:6px]',
}
const cellPaddingClass = computed(() => (componentSize.value === 'large' ? 'px-4' : 'px-3'))
const bodyTextClass = computed(() => (componentSize.value === 'small' ? 'text-z-sm' : componentSize.value === 'large' ? 'text-z-lg' : 'text-z'))
const bodyCellFrameClass = computed(() =>
  componentSize.value === 'small'
    ? 'border-y-2 border-transparent bg-clip-padding'
    : 'border-y-[3px] border-transparent bg-clip-padding',
)
const firstRowTopGapClass = computed(() => (componentSize.value === 'small' ? 'border-t-4' : 'border-t-[6px]'))

function getRowKey(row: Row, index: number) {
  if (typeof props.rowKey === 'function')
    return props.rowKey(row, index)
  const value = cellValue(row, props.rowKey)
  return typeof value === 'string' || typeof value === 'number' ? value : index
}

function isRowSelected(row: Row, index: number) {
  return props.selectedRowKeys.includes(getRowKey(row, index))
}

function isRowExpanded(row: Row, index: number) {
  return props.expandedRowKeys.includes(getRowKey(row, index))
}

function rowBackgroundClass(row: Row, index: number) {
  if (isRowSelected(row, index))
    return 'bg-(--z-table-row-selected-bg)'
  if (props.stripe && index % 2 === 1)
    return 'bg-(--z-table-row-stripe-bg)'
  return 'bg-(--z-table-row-bg)'
}

function rowClass(row: Row, index: number) {
  return [
    'h-(--table-row-height)',
    typeof props.rowClassName === 'function' ? props.rowClassName({ row, rowIndex: index }) : props.rowClassName,
    isRowSelected(row, index)
      ? 'hover:[&>td]:bg-(--z-table-row-selected-hover-bg)'
      : 'hover:[&>td]:bg-(--z-table-row-hover-bg)',
  ]
}

function stickyClass(column: ResolvedTableColumn<Row>, header = false) {
  if (!column.sticky)
    return undefined
  const showShadow = column.sticky === 'left' ? horizontalScrolled.value : horizontalCanScrollRight.value
  return [
    'sticky',
    header ? 'z-40' : 'z-20',
    showShadow
      ? column.sticky === 'left'
        ? 'shadow-[8px_0_14px_-14px_var(--z-color-shadow)]'
        : 'shadow-[-8px_0_14px_-14px_var(--z-color-shadow)]'
      : undefined,
  ]
}

function bodyCellTitle(column: ResolvedTableColumn<Row>, row: Row) {
  return slots[column.key] ? undefined : cellTitle(column, row)
}

function columnSortDirection(column: ResolvedTableColumn<Row>) {
  return props.sort?.key === columnSortKey(column) ? props.sort.direction : undefined
}

function toggleColumnSort(column: ResolvedTableColumn<Row>) {
  const key = columnSortKey(column)
  const direction = columnSortDirection(column)
  if (!direction)
    emit('sortChange', { key, direction: 'asc' })
  else if (direction === 'asc')
    emit('sortChange', { key, direction: 'desc' })
  else emit('sortChange', undefined)
}

function columnAriaSort(column: ResolvedTableColumn<Row>) {
  const direction = columnSortDirection(column)
  if (direction === 'asc')
    return 'ascending'
  if (direction === 'desc')
    return 'descending'
  return column.sortable ? 'none' : undefined
}

function sortButtonLabel(column: ResolvedTableColumn<Row>) {
  const direction = columnSortDirection(column)
  if (!direction)
    return locale.value.table.ascending(column.label || column.key)
  if (direction === 'asc')
    return locale.value.table.descending(column.label || column.key)
  return locale.value.table.clearSort(column.label || column.key)
}
</script>

<template>
  <div class="@container/table isolate flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden" :class="tableSizeClasses[componentSize]" :aria-busy="loading || undefined">
    <div class="relative flex min-h-0 max-w-full flex-1 overflow-hidden" :class="loading && !hasRows ? 'min-h-36' : undefined">
      <Scrollbar
        v-if="hasRows || showHeaderWhenEmpty"
        ref="scrollbar"
        class="min-h-0 flex-1 [--z-scrollbar-track-inset-block-start:calc(var(--table-header-height)+0.25rem)]"
        :always-visible="scrollbarAlwaysVisible"
        :inert="loading || undefined"
        horizontal
        @scroll="handleTableScroll"
      >
        <table ref="table" class="table-fixed border-separate border-spacing-0 text-left" :style="resolvedTableStyle">
          <colgroup>
            <col v-for="column in computedColumns" :key="column.key" :style="columnStyle(column, computedColumns)">
          </colgroup>
          <thead class="sticky top-0 z-30 rounded-z bg-(--z-table-header-bg) shadow-[0_10px_16px_-18px_var(--z-color-shadow)]">
            <tr class="h-(--table-header-height) font-bold text-z-text-secondary" :class="{ small: 'text-z-xs', default: 'text-z-sm', large: 'text-z' }[componentSize]">
              <th
                v-for="(column, columnIndex) in computedColumns"
                :key="column.key"
                class="whitespace-nowrap"
                :class="[
                  column.paddingClass ?? cellPaddingClass,
                  alignClass(column),
                  columnIndex === 0 ? 'rounded-l-z' : undefined,
                  columnIndex === computedColumns.length - 1 ? 'rounded-r-z' : undefined,
                  column.sticky && 'bg-(--z-table-header-bg)',
                  stickyClass(column, true),
                ]"
                :style="stickyStyle(column)"
                scope="col"
                :aria-sort="columnAriaSort(column)"
              >
                <div :class="cellContentClass(column)" :data-column-motion="column.sticky ? undefined : column.key">
                  <button
                    v-if="column.sortable"
                    type="button"
                    class="inline-flex max-w-full touch-manipulation items-center gap-1 border-0 bg-transparent p-0 text-inherit outline-none transition-colors hover:text-z-text focus-visible:text-z-primary-text motion-reduce:transition-none"
                    :aria-label="sortButtonLabel(column)"
                    @click="toggleColumnSort(column)"
                  >
                    <span class="truncate">
                      <slot :name="`header-${column.key}`" :column="column">{{ column.label }}</slot>
                    </span>
                    <span class="inline-flex shrink-0 -translate-y-px flex-col gap-px" aria-hidden="true">
                      <Triangle
                        class="size-1.25 fill-current"
                        :class="[
                          columnSortDirection(column) === 'asc' ? 'text-z-primary-text' : 'text-z-text-tertiary',
                          columnSortDirection(column) === 'desc' ? 'opacity-30' : undefined,
                        ]"
                        :stroke-width="0"
                      />
                      <Triangle
                        class="size-1.25 rotate-180 fill-current"
                        :class="[
                          columnSortDirection(column) === 'desc' ? 'text-z-primary-text' : 'text-z-text-tertiary',
                          columnSortDirection(column) === 'asc' ? 'opacity-30' : undefined,
                        ]"
                        :stroke-width="0"
                      />
                    </span>
                  </button>
                  <slot v-else :name="`header-${column.key}`" :column="column">
                    {{ column.label }}
                  </slot>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(row, index) in displayRows" :key="getRowKey(row, index)">
              <tr :class="rowClass(row, index)" :aria-selected="isRowSelected(row, index) || undefined">
                <td
                  v-for="(column, columnIndex) in computedColumns"
                  :key="column.key"
                  class="min-w-0"
                  :class="[
                    column.paddingClass ?? cellPaddingClass,
                    bodyTextClass,
                    bodyCellFrameClass,
                    column.contentClass,
                    alignClass(column),
                    index === 0 ? firstRowTopGapClass : undefined,
                    columnIndex === 0 ? 'rounded-l-z' : undefined,
                    columnIndex === computedColumns.length - 1 ? 'rounded-r-z' : undefined,
                    stickyClass(column),
                    rowBackgroundClass(row, index),
                  ]"
                  :style="stickyStyle(column)"
                >
                  <div class="grid min-h-[calc(var(--table-row-height)-var(--table-row-gap))] content-center" :data-column-motion="column.sticky ? undefined : column.key">
                    <div :class="cellContentClass(column)" :title="bodyCellTitle(column, row)">
                      <slot
                        :name="column.key"
                        :row="row"
                        :value="cellValue(row, column.key)"
                        :display-value="cellDisplayValue(column, row)"
                        :index="index"
                      >
                        {{ cellDisplayValue(column, row) }}
                      </slot>
                    </div>
                  </div>
                </td>
              </tr>
              <Transition :css="false" @enter="expandMotion.enter" @leave="expandMotion.leave">
                <tr v-if="isRowExpanded(row, index)">
                  <td :colspan="computedColumns.length" class="p-0">
                    <div data-expanded-content>
                      <div class="rounded-z border-y-transparent bg-z-fill-quaternary bg-clip-padding" :class="bodyCellFrameClass">
                        <slot name="expanded" :row="row" :index="index" />
                      </div>
                    </div>
                  </td>
                </tr>
              </Transition>
            </template>
          </tbody>
        </table>
      </Scrollbar>
      <div
        v-if="!hasRows"
        class="grid min-h-0 flex-1 place-items-center overflow-hidden px-4"
        :class="showHeaderWhenEmpty ? 'absolute inset-x-0 top-(--table-header-height) bottom-0' : undefined"
      >
        <slot v-if="!loading" name="empty">
          <Empty :title="emptyText ?? locale.common.empty" surface="none" class="w-full max-w-80" />
        </slot>
      </div>
      <!-- 加载反馈属于表格自身，独立使用和服务端渲染都不依赖宿主注册指令。 -->
      <div
        v-if="loading"
        class="absolute inset-x-0 bottom-0 z-50 grid place-items-center rounded-[inherit] bg-z-bg-container/82 backdrop-blur-xs"
        :class="!hasRows && showHeaderWhenEmpty ? 'top-(--table-header-height)' : 'top-0'"
        role="status"
        aria-live="polite"
      >
        <span class="inline-flex min-h-10 items-center gap-2.5 px-3 py-2 text-xs leading-none font-heavy text-z-text-secondary">
          <span
            class="size-4 shrink-0 rounded-full bg-[radial-gradient(circle_at_center,var(--z-color-bg-container)_0_44%,transparent_46%),conic-gradient(from_0deg,var(--z-color-primary)_0deg_105deg,var(--z-color-primary-hover)_105deg_200deg,var(--z-color-fill-tertiary)_200deg_360deg)] motion-safe:animate-spin"
            aria-hidden="true"
          />
          <span>{{ locale.common.loading }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
