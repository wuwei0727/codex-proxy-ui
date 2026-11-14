<script setup lang="ts">
import SkeletonDemo from '../examples/SkeletonDemo.vue'
</script>

# Skeleton 骨架屏

在加载期间显示内容的轮廓。

## 基础用法

通过 `shape` 和尺寸组合占位元素，使用 `animated` 开启动画。

<DemoExample wide>

<ClientOnly>
  <SkeletonDemo />
</ClientOnly>

<template #source>

<<< @/examples/SkeletonDemo.vue

</template>

</DemoExample>

## Skeleton API {#api}

### 属性

| 属性       | 说明                               | 类型                            | 默认值    |
| ---------- | ---------------------------------- | ------------------------------- | --------- |
| `as`       | 根元素标签                         | `keyof HTMLElementTagNameMap`   | `'span'`  |
| `shape`    | 占位形状，宽高由调用方设置         | `'text' \| 'block' \| 'circle'` | `'block'` |
| `animated` | 播放加载动画，尊重减少动态效果设置 | `boolean`                       | `true`    |
