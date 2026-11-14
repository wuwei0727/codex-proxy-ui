<script setup lang="ts">
import EmptyDemo from '../examples/EmptyDemo.vue'
</script>

# Empty 空状态

在没有数据时显示占位内容。

## 基础用法

使用 `description` 说明原因，通过 `action` 插槽添加操作。

<DemoExample>

<ClientOnly>
  <EmptyDemo />
</ClientOnly>

<template #source>

<<< @/examples/EmptyDemo.vue

</template>

</DemoExample>

## Empty API {#api}

### 属性

| 属性          | 说明       | 类型                            | 默认值       |
| ------------- | ---------- | ------------------------------- | ------------ |
| `title`       | 空状态标题 | `string`                        | `'暂无数据'` |
| `description` | 补充说明   | `string`                        | —            |
| `icon`        | 图标组件   | `Component`                     | `Inbox`      |
| `size`        | 尺寸       | `'small' \| 'default'`          | `'default'`  |
| `surface`     | 背景表面   | `'subtle' \| 'inset' \| 'none'` | `'subtle'`   |

### 插槽

| 插槽     | 说明       |
| -------- | ---------- |
| `icon`   | 替换图标   |
| `action` | 空状态操作 |
