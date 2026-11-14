<script setup lang="ts">
import CardDemo from '../examples/CardDemo.vue'
</script>

# Card 卡片

将相关内容放在同一张卡片中。

## 基础用法

通过默认插槽放置内容，使用 `actions` 插槽添加卡片操作。

<DemoExample wide>

<ClientOnly>
  <CardDemo />
</ClientOnly>

<template #source>

<<< @/examples/CardDemo.vue

</template>

</DemoExample>

## Card API {#api}

### 属性

| 属性                  | 说明       | 类型                               | 默认值      |
| --------------------- | ---------- | ---------------------------------- | ----------- |
| `as`                  | 根元素标签 | `keyof HTMLElementTagNameMap`      | `'section'` |
| `padding`             | 内容间距   | `'none' \| 'compact' \| 'default'` | `'default'` |
| `title / description` | 标题与说明 | `string`                           | —           |

### 插槽

| 插槽                  | 说明                |
| --------------------- | ------------------- |
| `default / body`      | 主体内容，body 优先 |
| `title / description` | 替换标题或说明文字  |
| `actions`             | 标题右侧操作        |
| `header`              | 替换整个头部        |
