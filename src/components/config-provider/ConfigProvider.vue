<script setup lang="ts">
import type { UiLocale } from '../../locale/types'
import type { ComponentSize } from '../../shared/types'
import { provide } from 'vue'
import { localeKey, useLocale } from '../../locale/context'
import { provideComponentSize } from '../../shared/size'

const props = defineProps<{ size?: ComponentSize, locale?: UiLocale }>()
provideComponentSize(() => props.size, 'config')
provide(localeKey, useLocale(() => props.locale))
</script>

<template>
  <slot />
</template>
