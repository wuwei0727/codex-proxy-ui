<script setup lang="ts">
import PageHeaderDemo from '../examples/PageHeaderDemo.vue'
</script>

# PageHeader 页头

在页面顶部显示标题和操作。

## 基础用法

使用 `title` 设置主标题，在 `actions` 插槽中放置按钮。

<DemoExample wide>

<ClientOnly>
  <PageHeaderDemo />
</ClientOnly>

<template #source>

<<< @/examples/PageHeaderDemo.vue

</template>

</DemoExample>

## PageHeader API {#api}

### 属性

| 属性          | 说明     | 类型     | 默认值 |
| ------------- | -------- | -------- | ------ |
| `title`       | 页面标题 | `string` | 必填   |
| `description` | 辅助说明 | `string` | —      |

### 插槽

| 插槽          | 说明         |
| ------------- | ------------ |
| `description` | 替换说明内容 |
| `actions`     | 页头操作     |
