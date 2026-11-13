import type { ComponentSize } from '../../shared/types'

// 单行高度由主题决定，文字沿用输入框的内缩，标签块与步进按钮使用四周等距的留白
const sizeClasses: Record<ComponentSize, string> = {
  small: '[--field-inline:0.75rem] [--field-row:1.25rem] [--field-height:var(--z-control-height-sm)] text-xs',
  default: '[--field-inline:0.875rem] [--field-row:1.5rem] [--field-height:var(--z-control-height)] text-z',
  large: '[--field-inline:1rem] [--field-row:1.5rem] [--field-height:var(--z-control-height-lg)] text-z-lg',
}

export function getInputClasses(size: ComponentSize, disabled: boolean, invalid: boolean, { open = false, inset = 'text', trailing = false }: { open?: boolean, inset?: 'text' | 'item', trailing?: boolean } = {}) {
  return [
    sizeClasses[size],
    'min-h-(--field-height) min-w-0 rounded-z border-0 [--field-pad:max(2px,calc((var(--field-height)-var(--field-row))/2))] py-(--field-pad) outline-none transition-[background-color,box-shadow,color] duration-160 motion-reduce:transition-none',
    inset === 'item' ? 'ps-(--field-pad)' : 'ps-(--field-inline)',
    trailing || inset === 'item' ? 'pe-(--field-pad)' : 'pe-(--field-inline)',
    disabled
      ? 'cursor-not-allowed bg-z-bg-container-disabled text-z-text-disabled shadow-none'
      : invalid
        ? [
            'text-z-text',
            open
              ? 'bg-(--z-input-error-active-bg) shadow-z-input-error-active'
              : 'bg-z-error-container shadow-z-input hover:not-focus-within:bg-(--z-input-error-active-bg) hover:not-focus-within:shadow-z-input-error-active focus-within:bg-(--z-input-error-active-bg) focus-within:shadow-z-input-error-active',
          ]
        : open
          ? 'bg-(--z-input-active-bg) text-z-text shadow-z-input-active'
          : 'bg-(--z-input-bg) text-z-text shadow-z-input hover:not-focus-within:bg-(--z-input-hover-bg) hover:not-focus-within:shadow-z-input-hover focus-within:bg-(--z-input-active-bg) focus-within:shadow-z-input-active',
  ]
}

export const inputTagClass = 'bg-(--z-input-tag-bg)!'

export const inputFieldClass = 'h-(--field-row) min-w-0 flex-1 border-0 bg-transparent font-emphasis leading-[1.15] text-z-text outline-0 placeholder:font-normal placeholder:text-z-text-quaternary disabled:cursor-not-allowed disabled:text-z-text-disabled [&[type=number]]:appearance-[textfield] [&[type=number]::-webkit-inner-spin-button]:m-0 [&[type=number]::-webkit-inner-spin-button]:appearance-none [&[type=number]::-webkit-outer-spin-button]:m-0 [&[type=number]::-webkit-outer-spin-button]:appearance-none'
