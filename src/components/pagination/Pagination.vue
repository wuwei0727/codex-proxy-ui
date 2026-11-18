<script setup lang="ts">
import type { PaginationProps } from './types'
import type { PagerItem } from './utils/pagination'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { useRafFn, useResizeObserver } from '@vueuse/core'
import { computed, shallowRef, useTemplateRef } from 'vue'
import { useLocale } from '../../locale/context'

import { useComponentSize } from '../../shared/size'
import IconButton from '../icon-button/IconButton.vue'
import Select from '../select/Select.vue'
import {
  getCurrentPage,
  getPagerItems,
  getPageSizeOptions,
  getTotalPages,
} from './utils/pagination'

const props = defineProps<PaginationProps>()
const emit = defineEmits<{ currentChange: [page: number], sizeChange: [pageSize: number] }>()

const componentSize = useComponentSize(() => props.size, 'small')

const locale = useLocale()

const page = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 20 })
const pagination = computed(() => ({
  currentPage: page.value,
  pageSize: pageSize.value,
  total: Number.isFinite(props.total) ? Math.max(0, Math.trunc(props.total)) : 0,
  pageSizes: props.pageSizes,
}))
const totalPages = computed(() => getTotalPages(pagination.value))
const currentPage = computed(() => getCurrentPage(pagination.value, totalPages.value))
const pageSizeOptions = computed(() => getPageSizeOptions(pagination.value, locale.value.pagination.pageSize))
const pagerItems = computed(() => getPagerItems(totalPages.value, currentPage.value))
const adjacentPagerItems = computed(() => {
  const count = Math.min(3, totalPages.value)
  const start = Math.max(1, Math.min(currentPage.value - 1, totalPages.value - count + 1))
  return Array.from({ length: count }, (_, index) => start + index)
})
const compactPagerItems = computed<PagerItem[]>(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 5)
    return Array.from({ length: total }, (_, index) => index + 1)
  if (current <= 3)
    return [1, 2, 3, 'ellipsis', total]
  if (current >= total - 2)
    return [1, 'ellipsis', total - 2, total - 1, total]
  return [1, 'ellipsis', current, 'ellipsis', total]
})

const controlsRef = useTemplateRef<HTMLElement>('controls')
const totalLabelRef = useTemplateRef<HTMLElement>('totalLabel')
const sizeControlRef = useTemplateRef<HTMLElement>('sizeControl')
const pagerRef = useTemplateRef<HTMLElement>('pager')
const pagerGroupRefs = useTemplateRef<HTMLElement[]>('pagerGroup')
const activePagerVariant = shallowRef(0)
const showPageSize = shallowRef(true)

// 页码位数和字体都会影响宽度，沿用已有密度方案并按实际占用空间选择
function updatePagerLayout() {
  const controls = controlsRef.value
  const sizeControl = sizeControlRef.value
  const pager = pagerRef.value
  const groups = pagerGroupRefs.value
  if (!controls?.clientWidth || !sizeControl || !pager || !groups?.length)
    return

  const widths = groups.map(group => group.getBoundingClientRect().width)
  const navigationWidth = pager.getBoundingClientRect().width - widths[activePagerVariant.value]!
  const gap = Number.parseFloat(getComputedStyle(controls).columnGap)
  const hasTotal = totalLabelRef.value && getComputedStyle(totalLabelRef.value).display !== 'none'
  const spaceWithSize = controls.clientWidth - sizeControl.getBoundingClientRect().width - gap * (hasTotal ? 2 : 1) - navigationWidth
  showPageSize.value = widths[0]! <= spaceWithSize
  const available = showPageSize.value ? spaceWithSize : controls.clientWidth - gap * (hasTotal ? 1 : 0) - navigationWidth
  activePagerVariant.value = widths.reduce((selected, width, index) => width <= available ? index : selected, 0)
}

// 下一帧再切换布局，避免在 ResizeObserver 通知中再次改变被观察元素尺寸
const { pause: pauseLayout, resume: scheduleLayout } = useRafFn(() => {
  pauseLayout()
  updatePagerLayout()
}, { immediate: false })
useResizeObserver(() => [controlsRef.value, sizeControlRef.value, pagerRef.value, ...(pagerGroupRefs.value ?? [])], scheduleLayout)

function changePageSize(value: number | undefined) {
  if (props.disabled || value === undefined || value === pageSize.value)
    return
  pageSize.value = value
  emit('sizeChange', value)
}

function goToPage(target: number) {
  if (props.disabled || target < 1 || target > totalPages.value || target === currentPage.value) {
    return
  }

  page.value = target
  emit('currentChange', target)
}

const pageSizeClasses = {
  small: 'h-z-control-sm min-w-z-control-sm text-xs',
  default: 'h-z-control min-w-z-control text-z',
  large: 'h-z-control-lg min-w-z-control-lg text-z-lg',
}

function paginationPageClass(page: number) {
  return [
    pageSizeClasses[componentSize.value],
    'inline-flex shrink-0 items-center justify-center rounded-z border-0 px-2 font-bold leading-none whitespace-nowrap transition-colors duration-150 outline-none',
    page === currentPage.value
      ? 'cursor-default bg-(--z-button-primary-bg) text-(--z-button-primary-color)'
      : 'cursor-pointer bg-z-fill-quaternary text-z-text hover:bg-z-bg-text-hover focus-visible:ring-2 focus-visible:ring-z-control-outline focus-visible:ring-offset-2 focus-visible:ring-offset-z-bg-container',
  ]
}
</script>

<template>
  <footer
    v-if="!hideOnSinglePage || totalPages > 1"
    class="@container/pagination mt-2 min-h-10 min-w-0 shrink-0 px-0 py-1"
  >
    <div
      ref="controls"
      class="grid min-w-0 items-center gap-2 @min-[36rem]/pagination:gap-3"
      :class="showPageSize ? 'grid-cols-[auto_minmax(0,1fr)] @min-[36rem]/pagination:grid-cols-[minmax(0,1fr)_auto_auto]' : 'grid-cols-1 @min-[36rem]/pagination:grid-cols-[minmax(0,1fr)_auto]'"
    >
      <span ref="totalLabel" class="hidden min-w-0 truncate text-z-sm font-emphasis text-z-text-secondary @min-[36rem]/pagination:block">
        {{ locale.pagination.total(pagination.total) }}
      </span>
      <div ref="sizeControl" class="w-28 shrink-0" :class="showPageSize ? undefined : 'pointer-events-none invisible fixed'">
        <Select
          v-if="showPageSize"
          :model-value="pageSize"
          :aria-label="locale.pagination.sizeLabel"
          :options="pageSizeOptions"
          :disabled="disabled"
          :size="componentSize"
          class="w-full"
          @change="changePageSize"
        />
      </div>

      <nav
        ref="pager"
        :aria-label="locale.pagination.label"
        class="flex shrink-0 items-center justify-self-end gap-2"
      >
        <IconButton
          variant="solid"
          :size="componentSize"
          :disabled="disabled || currentPage <= 1"
          :aria-label="locale.pagination.previous"
          @click="goToPage(currentPage - 1)"
        >
          <ChevronLeft class="size-4" />
        </IconButton>

        <div
          v-for="(items, variant) in [[currentPage], adjacentPagerItems, compactPagerItems, pagerItems]"
          :key="variant"
          class="shrink-0"
          :class="variant === activePagerVariant ? undefined : 'pointer-events-none invisible fixed size-0 overflow-hidden'"
          :inert="variant !== activePagerVariant || undefined"
        >
          <!-- 隐藏方案保留实际尺寸供测量，外层隔离溢出与交互 -->
          <div ref="pagerGroup" class="flex w-max items-center gap-2">
            <template v-for="(item, index) in items" :key="`${item}-${index}`">
              <span
                v-if="item === 'ellipsis'"
                :class="pageSizeClasses[componentSize]"
                class="inline-flex items-center justify-center font-bold text-z-text-quaternary"
              >
                …
              </span>
              <button
                v-else
                type="button"
                :class="paginationPageClass(item)"
                :disabled="disabled || item === currentPage"
                :aria-current="item === currentPage ? 'page' : undefined"
                @click="goToPage(item)"
              >
                {{ item }}
              </button>
            </template>
          </div>
        </div>

        <IconButton
          variant="solid"
          :size="componentSize"
          :disabled="disabled || currentPage >= totalPages"
          :aria-label="locale.pagination.next"
          @click="goToPage(currentPage + 1)"
        >
          <ChevronRight class="size-4" />
        </IconButton>
      </nav>
    </div>
  </footer>
</template>
