<script setup lang="ts">
import { CodeXml } from '@lucide/vue'
import DemoPlayground from './DemoPlayground.vue'

defineProps<{ wide?: boolean }>()
</script>

<template>
  <div class="docs-example">
    <DemoPlayground :wide="wide">
      <slot />
    </DemoPlayground>
    <details v-if="$slots.source" class="docs-example-source">
      <summary>
        <CodeXml :size="16" aria-hidden="true" />
        <span class="source-show">查看代码</span>
        <span class="source-hide">收起代码</span>
      </summary>
      <div class="docs-example-code">
        <slot name="source" />
      </div>
    </details>
  </div>
</template>

<style scoped>
.docs-example {
  margin: 20px 0 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.docs-example-source {
  border-top: 1px solid var(--vp-c-divider);
}

.docs-example-source summary {
  display: flex;
  min-height: 36px;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin: 0;
  padding: 8px 24px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 20px;
  list-style: none;
  cursor: pointer;
  transition: color 150ms;
}

.docs-example-source summary::-webkit-details-marker {
  display: none;
}

.docs-example-source summary:hover,
.docs-example-source[open] summary {
  color: var(--vp-c-brand-1);
}

.source-hide,
.docs-example-source[open] .source-show {
  display: none;
}

.docs-example-source[open] .source-hide {
  display: inline;
}

.docs-example-source summary:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.docs-example-code {
  padding: 1px 16px;
  border-top: 1px solid var(--vp-c-divider);
  border-radius: 0 0 6px 6px;
  background: var(--vp-code-block-bg);
}

.docs-example-code :deep(div[class*='language-']) {
  margin: 0 -16px;
  border-radius: inherit;
}

@media (prefers-reduced-motion: reduce) {
  .docs-example-source summary {
    transition: none;
  }
}
</style>
