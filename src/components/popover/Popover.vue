<script setup lang="ts">
import type { PopoverArrowSurfaceClass, PopoverPlacement, PopoverTrigger } from './types'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, useAttrs, useId, watch } from 'vue'
import { usePopoverPosition } from './composables/usePopoverPosition'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    placement?: PopoverPlacement
    trigger?: PopoverTrigger
    offset?: number
    disabled?: boolean
    /** 包含 hover 的触发方式打开弹窗的延迟（毫秒）；click 触发不生效。 */
    hoverDelay?: number
    showAfter?: number
    hideAfter?: number
    enterable?: boolean
    referenceElement?: HTMLElement | null
    role?: 'tooltip' | 'dialog'
    animatePosition?: boolean
    transition?: string
    teleported?: boolean
    /** 箭头贴合不同内容边缘时使用的表面类；字符串表示所有边缘共用。 */
    arrowSurfaceClass?: PopoverArrowSurfaceClass
  }>(),
  {
    placement: 'bottom-end',
    trigger: 'click',
    offset: 6,
    disabled: false,
    hoverDelay: 400,
    hideAfter: 200,
    enterable: true,
    referenceElement: null,
    animatePosition: false,
    transition: 'z-fade',
    teleported: true,
  },
)

const emit = defineEmits<{ open: [], opened: [], close: [], closed: [] }>()
defineSlots<{ reference: (props: { open: boolean, close: () => void, toggle: () => void, id: string }) => unknown, default: (props: { open: boolean, close: () => void, toggle: () => void }) => unknown }>()
const panelId = `z-popover-${useId()}`
let previouslyFocused: HTMLElement | null = null
let focusWasInside = false
const open = defineModel<boolean>({ default: false })
const attrs = useAttrs()

const rootRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const { popoverStyle, popoverArrowStyle, popoverPlacement, arrowEdge, updatePopoverPosition } = usePopoverPosition(props, open, rootRef, popoverRef)
const hoverCloseTimer = shallowRef<number>()
const hoverOpenTimer = shallowRef<number>()
const leavingStyle = new WeakMap<HTMLElement, string>()
const viewportTarget = computed(() => (open.value && typeof window !== 'undefined' ? window : null))

const popoverClasses = computed(() => [
  'fixed z-50 overflow-visible rounded-z-lg border-0 bg-z-bg-elevated font-sans text-left text-z leading-relaxed text-z-text shadow-z-popover',
  props.animatePosition
    ? 'transition-[left,top] duration-150 ease-out motion-reduce:transition-none'
    : undefined,
])
const popoverArrowSurfaceClass = computed(() => {
  if (typeof props.arrowSurfaceClass === 'string')
    return props.arrowSurfaceClass

  return props.arrowSurfaceClass?.[arrowEdge.value] ?? 'bg-inherit'
})

async function openPopover() {
  if (props.disabled || open.value)
    return

  clearHoverOpenTimer()
  clearHoverCloseTimer()
  open.value = true
  await nextTick()
  updatePopoverPosition()
}

function closePopover() {
  clearHoverOpenTimer()
  clearHoverCloseTimer()
  open.value = false
}

function togglePopover() {
  if (!supportsClickTrigger()) {
    return
  }

  if (open.value) {
    closePopover()
    return
  }

  void openPopover()
}

function supportsClickTrigger() {
  return props.trigger === 'click' || props.trigger === 'hover-click'
}

function supportsHoverTrigger() {
  return props.trigger === 'hover' || props.trigger === 'hover-click'
}

function clearHoverCloseTimer() {
  if (hoverCloseTimer.value === undefined) {
    return
  }

  window.clearTimeout(hoverCloseTimer.value)
  hoverCloseTimer.value = undefined
}

function clearHoverOpenTimer() {
  if (hoverOpenTimer.value === undefined) {
    return
  }

  window.clearTimeout(hoverOpenTimer.value)
  hoverOpenTimer.value = undefined
}

function handleHoverEnter() {
  if (!supportsHoverTrigger()) {
    return
  }

  clearHoverCloseTimer()
  if (open.value)
    return
  // 延迟打开：鼠标稳定悬停一小段时间再展示，避免扫过表格时弹窗频繁闪烁。
  if (hoverOpenTimer.value === undefined) {
    hoverOpenTimer.value = window.setTimeout(() => {
      hoverOpenTimer.value = undefined
      void openPopover()
    }, props.showAfter ?? props.hoverDelay)
  }
}

function handleHoverLeave() {
  if (!supportsHoverTrigger()) {
    return
  }

  clearHoverOpenTimer()
  clearHoverCloseTimer()
  hoverCloseTimer.value = window.setTimeout(closePopover, props.hideAfter)
}

function isPanelEvent(event: Event) {
  // 面板在事件传播途中关闭或重开时，ref 可能已指向新节点，原始路径仍可识别内部操作
  return event.composedPath().some(target => target instanceof HTMLElement && target.id === panelId)
}
onClickOutside(rootRef, (event) => {
  if (!isPanelEvent(event))
    closePopover()
}, { ignore: [popoverRef] })
useEventListener(rootRef, 'click', (event) => {
  if (isPanelEvent(event))
    return
  event.stopPropagation()
  togglePopover()
})
useEventListener(rootRef, 'mouseenter', handleHoverEnter)
useEventListener(rootRef, 'focusin', (event) => {
  // 鼠标点击保留的焦点会在窗口激活时恢复，只有键盘焦点需要打开悬停提示
  if (event.target instanceof Element && event.target.matches(':focus-visible'))
    handleHoverEnter()
})
useEventListener(rootRef, ['mouseleave', 'focusout'], handleHoverLeave)
useEventListener(popoverRef, ['mouseenter', 'focusin'], (event) => {
  if (props.enterable || event.type === 'focusin')
    handleHoverEnter()
  else
    handleHoverLeave()
})
useEventListener(popoverRef, ['mouseleave', 'focusout'], handleHoverLeave)
useEventListener(viewportTarget, 'keydown', (event) => {
  if (event instanceof KeyboardEvent && event.key === 'Escape') {
    if (open.value) {
      event.preventDefault()
      event.stopPropagation()
      closePopover()
    }
  }
})
watch(open, (visible, previous) => {
  if (visible) {
    focusWasInside = false
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    emit('open')
  }
  else if (previous) {
    emit('close')
  }
}, { immediate: true })
function restoreFocus() {
  // 只归还浮层实际接管过的焦点，纯悬停或输入框失焦关闭不能再次触发宿主的 focus 打开
  if ((popoverRef.value?.contains(document.activeElement) || (focusWasInside && document.activeElement === document.body)) && previouslyFocused?.isConnected)
    previouslyFocused.focus()
  previouslyFocused = null
  focusWasInside = false
}
function freezeLeavePosition(element: Element) {
  if (!(element instanceof HTMLElement))
    return
  focusWasInside = element.contains(document.activeElement)
  const rect = element.getBoundingClientRect()
  leavingStyle.set(element, element.style.cssText)
  // 退场时外部锚点可能被清空或移除，冻结实际坐标后只做透明度过渡
  Object.assign(element.style, {
    positionAnchor: 'none',
    positionVisibility: 'always',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    translate: 'none',
    transform: 'none',
    transitionProperty: 'opacity',
  })
}
function restorePosition(element: Element) {
  if (!(element instanceof HTMLElement))
    return
  const style = leavingStyle.get(element)
  if (style !== undefined) {
    element.style.cssText = style
    leavingStyle.delete(element)
  }
}
function finishLeave() {
  if (open.value)
    return
  restoreFocus()
  emit('closed')
}
defineExpose({ open: openPopover, close: closePopover, focus: () => (props.referenceElement ?? rootRef.value?.querySelector<HTMLElement>('button, [tabindex]'))?.focus(), updatePosition: updatePopoverPosition })
onBeforeUnmount(() => {
  clearHoverOpenTimer()
  clearHoverCloseTimer()
  restoreFocus()
})
</script>

<template>
  <div ref="rootRef" class="z-popover relative inline-flex max-w-full overflow-visible" v-bind="attrs">
    <slot :id="panelId" name="reference" :open="open" :close="closePopover" :toggle="togglePopover" />

    <Teleport to="body" :disabled="!teleported">
      <Transition
        :name="transition"
        @after-enter="open && emit('opened')"
        @before-enter="restorePosition"
        @before-leave="freezeLeavePosition"
        @leave-cancelled="restorePosition"
        @after-leave="finishLeave"
      >
        <div
          v-if="open"
          :id="panelId"
          ref="popoverRef"
          :role="role"
          data-z-overlay
          :data-z-placement="popoverPlacement"
          :class="popoverClasses"
          :style="popoverStyle"
        >
          <span
            class="pointer-events-none absolute size-2 rotate-45"
            :class="[
              popoverArrowSurfaceClass,
              props.animatePosition
                ? 'transition-[left,top] duration-150 ease-out motion-reduce:transition-none'
                : undefined,
            ]"
            :style="popoverArrowStyle"
          />
          <slot :open="open" :close="closePopover" :toggle="togglePopover" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@layer components {
  :where(.z-popover) {
    width: fit-content;
  }
}
</style>
