<script setup lang="ts" generic="Row extends object = Record<string, unknown>">
import type { ResolvedTableColumn, TableEmits, TableProps } from './types'
import { Triangle } from '@lucide/vue'

import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useSlots, useTemplateRef, watch } from 'vue'
import { useLocale } from '../../locale/context'
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
  selectedRowKeys: () => [],
  expandedRowKeys: () => [],
  size: 'default',
  loading: false,
  showHeaderWhenEmpty: false,
  scrollbarAlwaysVisible: false,
  sort: undefined,
  resizable: true,
  headerAlign: 'center',
})

const emit = defineEmits<TableEmits>()

const locale = useLocale()

const slots = useSlots()
const columnCustomWidths = shallowRef<Record<string, number>>({})
const resizingColumnKey = shallowRef<string | null>(null)

const storageKey = computed(() => props.tableId ? `codex-proxy:table-column-widths:${props.tableId}` : null)

function readStoredWidths() {
  if (!storageKey.value || typeof window === 'undefined')
    return
  try {
    const raw = localStorage.getItem(storageKey.value)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        columnCustomWidths.value = parsed
      }
    }
    else {
      columnCustomWidths.value = {}
    }
  }
  catch {
    // fallback
  }
}

watch(storageKey, readStoredWidths, { immediate: true })

function persistWidths() {
  if (!storageKey.value || typeof window === 'undefined')
    return
  try {
    if (Object.keys(columnCustomWidths.value).length > 0) {
      localStorage.setItem(storageKey.value, JSON.stringify(columnCustomWidths.value))
    }
    else {
      localStorage.removeItem(storageKey.value)
    }
    if (props.tableId) {
      window.dispatchEvent(new CustomEvent(`codex-proxy:table-widths-updated:${props.tableId}`, {
        detail: { ...columnCustomWidths.value }
      }))
    }
  }
  catch {
    // fallback
  }
}

const effectiveColumns = computed(() => {
  const custom = columnCustomWidths.value
  return props.columns.map((column) => {
    const customWidth = custom[column.key]
    if (typeof customWidth === 'number') {
      const minWidth = column.minWidth ?? (column.kind === 'status' ? 44 : 56)
      const clampedWidth = Math.max(minWidth, customWidth)
      return {
        ...column,
        width: clampedWidth,
        basisWidth: clampedWidth,
        fixedWidth: column.fixedWidth ?? true,
      }
    }
    return column
  })
})

const computedColumns = computed(() => resolveColumns(effectiveColumns.value))
const resolvedTableStyle = computed(() => tableStyle(computedColumns.value))

function canResizeColumn(column: ResolvedTableColumn<Row>, index: number) {
  if (!props.resizable)
    return false
  if (index >= computedColumns.value.length - 1)
    return false
  if (column.kind === 'selection' || column.kind === 'expander')
    return false
  return true
}

let startX = 0
let startWidth = 0
let lastClickTime = 0
let lastClickKey = ''

function handleResizeStart(event: MouseEvent, column: ResolvedTableColumn<Row>) {
  const now = Date.now()
  if (lastClickKey === column.key && now - lastClickTime < 350) {
    lastClickTime = 0
    lastClickKey = ''
    handleResetColumnWidth(column)
    return
  }
  lastClickTime = now
  lastClickKey = column.key

  resizingColumnKey.value = column.key
  startX = event.clientX
  startWidth = columnCustomWidths.value[column.key] ?? column.basisWidth

  // 最小宽度严格基于列配置 minWidth（默认根据列类型 44/56），杜绝误算导致拖动向右跳变
  const minWidthLimit = column.minWidth ?? (column.kind === 'status' ? 44 : 56)
  const effectiveMinWidth = Math.max(36, minWidthLimit)

  const onMouseMove = (moveEvent: MouseEvent) => {
    const delta = moveEvent.clientX - startX
    const newWidth = Math.max(effectiveMinWidth, Math.round(startWidth + delta))
    columnCustomWidths.value = {
      ...columnCustomWidths.value,
      [column.key]: newWidth,
    }
    updateScrollLayout()
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove, true)
    window.removeEventListener('mouseup', onMouseUp, true)
    document.body.style.removeProperty('cursor')
    document.body.style.removeProperty('user-select')

    const finalWidth = columnCustomWidths.value[column.key]
    if (finalWidth !== undefined) {
      persistWidths()
      emit('columnResize', { key: column.key, width: finalWidth })
    }
    resizingColumnKey.value = null
    void nextTick(updateScrollLayout)
  }

  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  window.addEventListener('mousemove', onMouseMove, true)
  window.addEventListener('mouseup', onMouseUp, true)
}

function handleResetColumnWidth(column: ResolvedTableColumn<Row>) {
  if (columnCustomWidths.value[column.key] === undefined)
    return
  const next = { ...columnCustomWidths.value }
  delete next[column.key]
  columnCustomWidths.value = next
  persistWidths()
  emit('columnResetWidth', column.key)
  void nextTick(updateScrollLayout)
}

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

function handleExternalReset() {
  columnCustomWidths.value = {}
  void nextTick(updateScrollLayout)
}

onMounted(async () => {
  await nextTick()
  updateScrollLayout()
  if (typeof window !== 'undefined' && props.tableId) {
    window.addEventListener(`codex-proxy:table-reset:${props.tableId}`, handleExternalReset)
    window.addEventListener('storage', readStoredWidths)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined' && props.tableId) {
    window.removeEventListener(`codex-proxy:table-reset:${props.tableId}`, handleExternalReset)
    window.removeEventListener('storage', readStoredWidths)
  }
})
useResizeObserver(() => [scrollbarRef.value?.wrapRef, tableRef.value].filter(Boolean), updateScrollLayout)
watch([() => displayRows.value.length, () => props.columns], async () => {
  await nextTick()
  updateScrollLayout()
})

const headerRowClass = computed(() => [
  props.size === 'small' ? 'h-8 text-z-xs' : props.size === 'large' ? 'h-12 text-z' : 'h-10 text-z-sm',
  'font-bold text-z-text-secondary',
])
const bodyRowClass = computed(() => (props.size === 'small' ? 'h-z-table-row-sm' : props.size === 'large' ? 'h-12' : 'h-z-table-row'))
const cellPaddingClass = computed(() => (props.size === 'small' ? 'px-1.5' : props.size === 'large' ? 'px-4' : 'px-2'))
const bodyTextClass = computed(() => (props.size === 'small' ? 'text-z-sm' : props.size === 'large' ? 'text-z-lg' : 'text-z'))
const bodyCellFrameClass = computed(() =>
  props.size === 'small'
    ? 'border-y-2 border-transparent bg-clip-padding'
    : 'border-y-[3px] border-transparent bg-clip-padding',
)
const firstRowTopGapClass = computed(() => (props.size === 'small' ? 'border-t-4' : 'border-t-[6px]'))
const bodyCellContentClass = computed(() =>
  props.size === 'small'
    ? 'min-h-[calc(var(--z-table-row-height-sm)-4px)]'
    : 'min-h-[calc(var(--z-table-row-height)-6px)]',
)

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
  if (index % 2 === 1)
    return 'bg-(--z-table-row-stripe-bg)'
  return 'bg-(--z-table-row-bg)'
}

function rowClass(row: Row, index: number) {
  return [
    bodyRowClass.value,
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

function headerAlignClass(column: ResolvedTableColumn<Row>) {
  const align = column.headerAlign ?? props.headerAlign ?? 'center'
  if (align === 'center')
    return 'text-center'
  if (align === 'right')
    return 'text-right'
  return 'text-left'
}

function headerJustifyClass(column: ResolvedTableColumn<Row>) {
  const align = column.headerAlign ?? props.headerAlign ?? 'center'
  if (align === 'center')
    return 'justify-center'
  if (align === 'right')
    return 'justify-end'
  return 'justify-start'
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
  <div class="@container/table isolate flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden" :aria-busy="loading || undefined">
    <div class="relative flex min-h-0 max-w-full flex-1 overflow-hidden" :class="loading && !hasRows ? 'min-h-36' : undefined">
      <Scrollbar
        v-if="hasRows || showHeaderWhenEmpty"
        ref="scrollbar"
        class="min-h-0 flex-1"
        :class="
          size === 'small'
            ? '[--z-scrollbar-track-inset-block-start:2.25rem]'
            : '[--z-scrollbar-track-inset-block-start:2.75rem]'
        "
        :always-visible="scrollbarAlwaysVisible"
        :inert="loading || undefined"
        horizontal
        @scroll="handleTableScroll"
      >
        <table ref="table" class="table-fixed border-separate border-spacing-0 text-left" :style="resolvedTableStyle">
          <colgroup>
            <col v-for="column in computedColumns" :key="column.key" :style="columnStyle(column, computedColumns)">
          </colgroup>
          <thead>
            <tr :class="headerRowClass">
              <th
                v-for="(column, columnIndex) in computedColumns"
                :key="column.key"
                class="relative group/th sticky top-0 select-none whitespace-nowrap bg-(--z-table-header-bg) shadow-[0_10px_16px_-18px_var(--z-color-shadow)]"
                :class="[
                  column.paddingClass ?? cellPaddingClass,
                  headerAlignClass(column),
                  columnIndex === 0 ? 'rounded-l-z' : undefined,
                  columnIndex === computedColumns.length - 1 ? 'rounded-r-z' : undefined,
                  stickyClass(column, true),
                  resizingColumnKey === column.key ? 'z-50' : 'hover:z-40 z-30',
                ]"
                :style="stickyStyle(column)"
                scope="col"
                :aria-sort="columnAriaSort(column)"
              >
                <div
                  :class="[
                    cellContentClass(column),
                    'flex items-center min-w-0 max-w-full',
                    headerJustifyClass(column),
                  ]"
                  :data-column-motion="column.sticky ? undefined : column.key"
                >
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
                    <span class="truncate">{{ column.label }}</span>
                  </slot>
                </div>
                <div
                  v-if="canResizeColumn(column, columnIndex)"
                  class="z-table-resizer group/resizer absolute top-0 right-0 bottom-0 z-30 flex w-3.5 cursor-col-resize select-none touch-none items-center justify-center transition-colors hover:bg-z-primary/15"
                  :class="{ 'bg-z-primary/20': resizingColumnKey === column.key }"
                  :title="locale.table.resizeColumn ?? '拖动调整列宽，双击恢复默认'"
                  @mousedown.stop.prevent="handleResizeStart($event, column)"
                  @dblclick.stop.prevent="handleResetColumnWidth(column)"
                >
                  <div
                    class="h-4 w-[2px] rounded-full bg-z-border transition-all duration-150 group-hover/th:h-4.5 group-hover/th:bg-z-text-quaternary group-hover/resizer:h-5 group-hover/resizer:w-1 group-hover/resizer:bg-z-primary group-hover/resizer:shadow-[0_0_6px_var(--z-color-primary)]"
                    :class="[
                      resizingColumnKey === column.key
                        ? '!h-5 !w-1 !bg-z-primary !shadow-[0_0_8px_var(--z-color-primary)]'
                        : ''
                    ]"
                  />
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
                  class="min-w-0 transition-[background-color] duration-150 ease-out motion-reduce:transition-none"
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
                  <div class="grid content-center" :class="bodyCellContentClass" :data-column-motion="column.sticky ? undefined : column.key">
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
        :class="showHeaderWhenEmpty ? ['absolute inset-x-0 bottom-0', size === 'small' ? 'top-8' : 'top-10'] : undefined"
      >
        <slot v-if="!loading" name="empty">
          <Empty :title="emptyText ?? locale.common.empty" surface="none" class="w-full max-w-80" />
        </slot>
      </div>
      <!-- 加载反馈属于表格自身，独立使用和服务端渲染都不依赖宿主注册指令。 -->
      <div
        v-if="loading"
        class="absolute inset-x-0 bottom-0 z-50 grid place-items-center rounded-[inherit] bg-z-bg-container/82 backdrop-blur-xs"
        :class="!hasRows && showHeaderWhenEmpty ? (size === 'small' ? 'top-8' : 'top-10') : 'top-0'"
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

<style scoped>
.z-table-resizer:hover > div,
.z-table-resizer.is-resizing > div {
  height: 1.25rem !important;
  width: 3.5px !important;
  background-color: var(--z-color-primary) !important;
  box-shadow: 0 0 6px var(--z-color-primary) !important;
}
</style>
