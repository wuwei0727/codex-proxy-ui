<script setup lang="ts">
import SegmentedDemo from '../examples/SegmentedDemo.vue'
</script>

# Segmented 分段选择

在少量互斥选项之间切换。

## 基础用法

通过 `options` 提供选项，使用 `v-model` 绑定选中值。

<DemoExample wide>

<ClientOnly>
  <SegmentedDemo />
</ClientOnly>

<template #source>

<<< @/examples/SegmentedDemo.vue

</template>

</DemoExample>

## Segmented API {#api}

### 属性

| 属性         | 说明                                       | 类型                              | 默认值      |
| ------------ | ------------------------------------------ | --------------------------------- | ----------- |
| `v-model`    | 当前选项值                                 | `string`                          | 必填        |
| `aria-label` | 选项组名称，未设置时沿用 FormItem 标签     | `string`                          | —           |
| `options`    | 选项包含 label、value，可选 icon、disabled | `SegmentedOption[]`               | 必填        |
| `display`    | 显示文本或图标                             | `'label' \| 'icon'`               | `'label'`   |
| `size`       | 尺寸                                       | `'small' \| 'default' \| 'large'` | `'default'` |
| `disabled`   | 禁用整组                                   | `boolean`                         | `false`     |

### 事件

| 事件                | 说明                 |
| ------------------- | -------------------- |
| `update:modelValue` | string，绑定值变化   |
| `change`            | string，用户切换选项 |

### 实例

`focus()` 聚焦当前可通过 Tab 访问的选项
