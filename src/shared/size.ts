import type { InjectionKey, Ref } from 'vue'
import type { ComponentSize } from './types'
import { computed, inject, provide } from 'vue'

type SizeSource = () => ComponentSize | undefined
type SizeKey = InjectionKey<Readonly<Ref<ComponentSize | undefined>>>
const configSize: SizeKey = Symbol('config-size')
const formSize: SizeKey = Symbol('form-size')

export function provideComponentSize(source: SizeSource, scope: 'config' | 'form') {
  const key = scope === 'config' ? configSize : formSize
  const parent = inject(key, null)
  // 未配置的作用域保持透明，分页等组件可以保留自己的默认尺寸
  provide(key, computed(() => source() ?? parent?.value))
}

export function useComponentSize(source: SizeSource, fallback: ComponentSize = 'default') {
  const form = inject(formSize, null)
  const config = inject(configSize, null)
  return computed(() => source() ?? form?.value ?? config?.value ?? fallback)
}

export const choiceLabelClasses: Record<ComponentSize, string> = {
  small: 'gap-2 text-z-sm',
  default: 'gap-2.5 text-z',
  large: 'gap-3 text-z-lg',
}
