<script setup lang="ts">
import MarkdownDemo from '../examples/MarkdownDemo.vue'
import MarkdownAlertsDemo from '../examples/MarkdownAlertsDemo.vue'
</script>

# Markdown 内容

将 Markdown 文本渲染为可阅读的说明、列表和代码，过滤不安全的 HTML 内容

## 基础用法

<DemoExample>

<ClientOnly>
  <MarkdownDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZMarkdown } from '@codex-proxy/ui'

const source = '### 请求工作台\n\n通过 **显式授权** 使用插件能力'
</script>

<template>
  <ZMarkdown :source="source" />
</template>
```

</template>

</DemoExample>

## 提示块

支持 GitHub 的 `NOTE`、`TIP`、`IMPORTANT`、`WARNING` 和 `CAUTION` 提示块，使用不同的图标、标题与主题色区分用途

<DemoExample>

<ClientOnly>
  <MarkdownAlertsDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZMarkdown } from '@codex-proxy/ui'

const source = '> [!IMPORTANT]\n> 修改共享配置会影响后续请求，保存前请检查配置'
</script>

<template>
  <ZMarkdown :source="source" />
</template>
```

</template>

</DemoExample>

类型标记独占引用块的第一行，后续内容继续使用 `>`，块内可以包含段落、列表、链接和行内代码

## 用法说明

通过 `source` 传入文本，不把未经处理的 HTML 直接注入页面

代码块可横向滚动，右上角的按钮可复制整段代码

## Markdown API {#api}

### 属性

| 属性     | 说明                          | 类型             | 默认值 |
| -------- | ----------------------------- | ---------------- | ------ |
| `source` | Markdown 文本，空值显示空内容 | `string \| null` | —      |
