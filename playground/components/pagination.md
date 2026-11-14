<script setup lang="ts">
import PaginationDemo from '../examples/PaginationDemo.vue'
</script>

# Pagination 分页

将较长的列表分成多页。

## 基础用法

绑定 `current-page` 和 `page-size`，通过 `total` 设置总条数。

<DemoExample wide>

<ClientOnly>
  <PaginationDemo />
</ClientOnly>

<template #source>

<<< @/examples/PaginationDemo.vue

</template>

</DemoExample>

## Pagination API {#api}

### 属性

| 属性                   | 说明         | 类型       | 默认值              |
| ---------------------- | ------------ | ---------- | ------------------- |
| `v-model:current-page` | 当前页码     | `number`   | `1`                 |
| `v-model:page-size`    | 每页条数     | `number`   | `20`                |
| `total`                | 总条数       | `number`   | 必填                |
| `page-sizes`           | 条数选项     | `number[]` | `[10, 20, 50, 100]` |
| `disabled`             | 禁用全部操作 | `boolean`  | `false`             |

### 事件

| 事件                 | 说明             | 参数           |
| -------------------- | ---------------- | -------------- |
| `update:currentPage` | 更新当前页码     | `page: number` |
| `update:pageSize`    | 更新每页条数     | `size: number` |
| `current-change`     | 用户切换页码     | `page: number` |
| `size-change`        | 用户调整每页条数 | `size: number` |

条数变化不隐式重置页码、不请求数据，调用方需要重置时在 `size-change` 中处理

超出总页数的模型只限制显示与操作范围，程序更新不产生用户事件。总条数按非负整数显示，缺失、非数值或非有限值按 `0` 处理；没有数据时显示第 1 页。组件不提供自定义插槽
