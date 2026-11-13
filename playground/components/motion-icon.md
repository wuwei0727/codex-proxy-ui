<script setup lang="ts">
import MotionIconDemo from '../examples/MotionIconDemo.vue'
</script>

# MotionIcon 动效图标

在指针经过时为图标添加动效。

## 基础用法

将图标放入默认插槽。开启系统的减少动态效果偏好时，动效会停用。

<DemoExample wide>

<ClientOnly>
  <MotionIconDemo />
</ClientOnly>

<template #source>

<<< @/examples/MotionIconDemo.vue

</template>

</DemoExample>

## MotionIcon API {#api}

### 属性

| 属性      | 说明                   | 类型                          | 默认值     |
| --------- | ---------------------- | ----------------------------- | ---------- |
| `as`      | 根元素标签             | `keyof HTMLElementTagNameMap` | `'span'`   |
| `variant` | 随机反馈或固定品牌动效 | `'random' \| 'brand'`         | `'random'` |

### 插槽

| 插槽      | 说明               |
| --------- | ------------------ |
| `default` | 需要动效的图标内容 |
