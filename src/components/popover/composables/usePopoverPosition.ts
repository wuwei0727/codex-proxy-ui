import type { CSSProperties, Ref } from 'vue'
import type { PopoverPlacement, PopoverSide } from '../types'
import { useEventListener, useResizeObserver, whenever } from '@vueuse/core'
import { clamp } from 'es-toolkit'
import { computed, nextTick, shallowRef, useId, watch } from 'vue'

interface PopoverPoint {
  left: number
  top: number
}

interface PopoverPosition {
  placement: PopoverPlacement
  point: PopoverPoint
}

export function usePopoverPosition(
  props: Readonly<{ placement: PopoverPlacement, offset: number, referenceElement: HTMLElement | null }>,
  open: Ref<boolean>,
  rootRef: Ref<HTMLElement | null>,
  popoverRef: Ref<HTMLElement | null>,
) {
  const popoverStyle = shallowRef<CSSProperties>({})
  const popoverArrowStyle = shallowRef<CSSProperties>({})
  const popoverPlacement = shallowRef<PopoverPlacement>(props.placement)
  const arrowEdge = computed(() => popoverArrowEdge(popoverPlacement.value))
  const referenceElement = computed(() => props.referenceElement ?? rootRef.value)
  const viewportTarget = computed(() => (open.value && typeof window !== 'undefined' ? window : null))
  const anchorName = `--z-popover-${useId()}`
  const nativeAnchor = typeof CSS !== 'undefined' && CSS.supports('top', 'anchor(bottom)')

  watch(referenceElement, (element, _, onCleanup) => {
    if (!nativeAnchor || !element)
      return

    // 外部锚点可能已被其他浮层使用，保留原有名称并在切换或卸载时移除自己的名称
    const original = element.style.getPropertyValue('anchor-name')
    const priority = element.style.getPropertyPriority('anchor-name')
    const existing = getComputedStyle(element).getPropertyValue('anchor-name').trim()
    const previous = existing === 'none' ? '' : existing
    element.style.setProperty('anchor-name', previous ? `${previous}, ${anchorName}` : anchorName, priority)
    onCleanup(() => {
      const names = element.style.getPropertyValue('anchor-name').split(',').map(name => name.trim())
      const remaining = names.filter(name => name !== anchorName).join(', ')
      element.style.setProperty('anchor-name', remaining === previous ? original : remaining, priority)
    })
  }, { flush: 'post' })

  function updatePopoverPosition() {
    if (!open.value || !referenceElement.value)
      return

    const viewportPadding = 8
    const triggerRect = referenceElement.value.getBoundingClientRect()
    const panelRect = popoverRef.value?.getBoundingClientRect()
    const panelWidth = panelRect?.width ?? 0
    const panelHeight = panelRect?.height ?? 0
    const maxLeft = Math.max(viewportPadding, window.innerWidth - panelWidth - viewportPadding)
    const maxTop = Math.max(viewportPadding, window.innerHeight - panelHeight - viewportPadding)
    const position = choosePopoverPosition({
      placement: props.placement,
      triggerRect,
      panelWidth,
      panelHeight,
      offset: props.offset,
      viewportPadding,
    })
    popoverPlacement.value = position.placement
    const left = clamp(position.point.left, viewportPadding, maxLeft)
    const top = clamp(position.point.top, viewportPadding, maxTop)

    popoverStyle.value = {
      positionAnchor: nativeAnchor ? anchorName : undefined,
      positionVisibility: nativeAnchor ? 'anchors-visible' : undefined,
      // 相对锚点保留翻转和边界修正，滚动跟随由浏览器完成，无需等待滚动回调
      // 锚点先于退场钩子卸载时，用最近一次测量值回退，避免 anchor() 退化为 auto
      left: nativeAnchor ? `calc(anchor(left, ${triggerRect.left}px) + ${left - triggerRect.left}px)` : `${left}px`,
      top: nativeAnchor ? `calc(anchor(top, ${triggerRect.top}px) + ${top - triggerRect.top}px)` : `${top}px`,
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
    }
    popoverArrowStyle.value = popoverArrowPosition({
      placement: position.placement,
      triggerRect,
      panelWidth,
      panelHeight,
      left,
      top,
    })
  }

  whenever(open, async () => {
    await nextTick()
    updatePopoverPosition()
  })
  watch(
    [() => props.placement, () => props.offset, referenceElement],
    async () => {
      if (!open.value)
        return
      await nextTick()
      updatePopoverPosition()
    },
  )

  useEventListener(viewportTarget, 'resize', updatePopoverPosition)
  useEventListener(viewportTarget, 'scroll', updatePopoverPosition, { capture: true, passive: true })
  useResizeObserver([referenceElement, popoverRef], updatePopoverPosition)

  return { popoverStyle, popoverArrowStyle, popoverPlacement, arrowEdge, updatePopoverPosition }
}

function popoverArrowEdge(placement: PopoverPlacement): PopoverSide {
  const placementSide = placement.split('-')[0] as PopoverSide
  const oppositeSide: Record<PopoverSide, PopoverSide> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }

  return oppositeSide[placementSide]
}

function choosePopoverPosition(options: {
  placement: PopoverPlacement
  triggerRect: DOMRect
  panelWidth: number
  panelHeight: number
  offset: number
  viewportPadding: number
}): PopoverPosition {
  const placements = placementCandidates(options.placement)

  for (const placement of placements) {
    const point = popoverPoint(placement, options)
    if (isPointInViewport(point, options)) {
      return { placement, point }
    }
  }

  return {
    placement: options.placement,
    point: popoverPoint(options.placement, options),
  }
}

function placementCandidates(placement: PopoverPlacement): PopoverPlacement[] {
  const all: PopoverPlacement[] = [
    'bottom-end',
    'bottom-start',
    'bottom',
    'top-end',
    'top-start',
    'top',
    'right',
    'left',
  ]
  const opposite: Record<PopoverPlacement, PopoverPlacement> = {
    'top': 'bottom',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    'right': 'left',
    'bottom': 'top',
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
    'left': 'right',
  }

  return [
    placement,
    opposite[placement],
    ...all.filter(item => item !== placement && item !== opposite[placement]),
  ]
}

function popoverPoint(
  placement: PopoverPlacement,
  options: {
    triggerRect: DOMRect
    panelWidth: number
    panelHeight: number
    offset: number
  },
): PopoverPoint {
  const { triggerRect, panelWidth, panelHeight, offset } = options
  const centerLeft = triggerRect.left + triggerRect.width / 2 - panelWidth / 2
  const centerTop = triggerRect.top + triggerRect.height / 2 - panelHeight / 2

  const points: Record<PopoverPlacement, PopoverPoint> = {
    'top': { left: centerLeft, top: triggerRect.top - panelHeight - offset },
    'top-start': { left: triggerRect.left, top: triggerRect.top - panelHeight - offset },
    'top-end': {
      left: triggerRect.right - panelWidth,
      top: triggerRect.top - panelHeight - offset,
    },
    'right': { left: triggerRect.right + offset, top: centerTop },
    'bottom': { left: centerLeft, top: triggerRect.bottom + offset },
    'bottom-start': { left: triggerRect.left, top: triggerRect.bottom + offset },
    'bottom-end': { left: triggerRect.right - panelWidth, top: triggerRect.bottom + offset },
    'left': { left: triggerRect.left - panelWidth - offset, top: centerTop },
  }

  return points[placement]
}

function isPointInViewport(
  point: PopoverPoint,
  options: {
    panelWidth: number
    panelHeight: number
    viewportPadding: number
  },
) {
  const { panelWidth, panelHeight, viewportPadding } = options

  return (
    point.left >= viewportPadding
    && point.top >= viewportPadding
    && point.left + panelWidth <= window.innerWidth - viewportPadding
    && point.top + panelHeight <= window.innerHeight - viewportPadding
  )
}

function popoverArrowPosition(options: {
  placement: PopoverPlacement
  triggerRect: DOMRect
  panelWidth: number
  panelHeight: number
  left: number
  top: number
}): CSSProperties {
  const arrowSize = 8
  const arrowHalf = arrowSize / 2
  const arrowPadding = 12
  const { placement, triggerRect, panelWidth, panelHeight, left, top } = options
  const side = placement.split('-')[0]
  const centerX = triggerRect.left + triggerRect.width / 2 - left
  const centerY = triggerRect.top + triggerRect.height / 2 - top

  if (side === 'top' || side === 'bottom') {
    const arrowLeft = clamp(centerX - arrowHalf, arrowPadding, panelWidth - arrowPadding)

    return {
      left: `${arrowLeft}px`,
      top: side === 'bottom' ? `${-arrowHalf}px` : `${panelHeight - arrowHalf}px`,
    }
  }

  const arrowTop = clamp(centerY - arrowHalf, arrowPadding, panelHeight - arrowPadding)

  return {
    left: side === 'right' ? `${-arrowHalf}px` : `${panelWidth - arrowHalf}px`,
    top: `${arrowTop}px`,
  }
}
