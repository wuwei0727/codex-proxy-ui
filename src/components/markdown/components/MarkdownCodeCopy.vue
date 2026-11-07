<script setup lang="ts">
import { Check, Copy, X } from '@lucide/vue'
import { computed, shallowRef, watchEffect } from 'vue'
import { useLocale } from '../../../locale/context'
import IconButton from '../../icon-button/IconButton.vue'

const props = defineProps<{ text: string }>()
const locale = useLocale()
const state = shallowRef<'copy' | 'copied' | 'copyFailed'>('copy')
const label = computed(() => locale.value.markdown[state.value])

watchEffect((onCleanup) => {
  if (state.value === 'copy')
    return
  const timer = setTimeout(() => {
    state.value = 'copy'
  }, 1800)
  onCleanup(() => clearTimeout(timer))
})

function legacyCopy(text: string) {
  // 普通 HTTP 页面通过原生复制事件写入文本，保留当前焦点与选区。
  let written = false
  function write(event: ClipboardEvent) {
    if (!event.clipboardData)
      return
    event.clipboardData.setData('text/plain', text)
    event.preventDefault()
    written = true
  }
  document.addEventListener('copy', write, { once: true })
  try {
    return document.execCommand('copy') && written
  }
  finally {
    document.removeEventListener('copy', write)
  }
}

async function copy() {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.text)
      state.value = 'copied'
    }
    else {
      state.value = legacyCopy(props.text) ? 'copied' : 'copyFailed'
    }
  }
  catch {
    state.value = 'copyFailed'
  }
}
</script>

<template>
  <IconButton
    size="small" class="size-6! pointer-coarse:size-8!"
    :aria-label="label" :type="state === 'copyFailed' ? 'danger' : 'default'" @click="copy"
  >
    <Check v-if="state === 'copied'" :size="12" />
    <X v-else-if="state === 'copyFailed'" :size="12" />
    <Copy v-else :size="12" />
    <span class="sr-only" role="status">{{ state === 'copy' ? '' : label }}</span>
  </IconButton>
</template>
