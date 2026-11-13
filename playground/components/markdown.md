<script setup lang="ts">
import MarkdownDemo from '../examples/MarkdownDemo.vue'
import MarkdownAlertsDemo from '../examples/MarkdownAlertsDemo.vue'
</script>

# Markdown 内容

将 Markdown 文本渲染为富文本。

## 基础用法

通过 `source` 传入 Markdown，代码块支持复制。

<DemoExample wide>

<ClientOnly>
  <MarkdownDemo />
</ClientOnly>

<template #source>

<<< @/examples/MarkdownDemo.vue

</template>

</DemoExample>

## 提示块

支持 GitHub 的 `NOTE`、`TIP`、`IMPORTANT`、`WARNING` 和 `CAUTION` 提示块，使用不同的图标、标题与主题色区分用途

<DemoExample wide>

<ClientOnly>
  <MarkdownAlertsDemo />
</ClientOnly>

<template #source>

<<< @/examples/MarkdownAlertsDemo.vue

</template>

</DemoExample>

类型标记独占引用块的第一行，后续内容继续使用 `>`，块内可以包含段落、列表、链接和行内代码

## Markdown API {#api}

### 属性

| 属性     | 说明                          | 类型             | 默认值 |
| -------- | ----------------------------- | ---------------- | ------ |
| `source` | Markdown 文本，空值显示空内容 | `string \| null` | —      |
