<script setup lang="ts">
import SliderDemo from '../examples/SliderDemo.vue'
import SliderDisabledDemo from '../examples/SliderDisabledDemo.vue'
</script>

# Slider 滑块

在指定范围内拖动选择数值。

## 基础用法

使用 `v-model` 绑定数值，通过 `step` 设置步长。

<DemoExample>

<ClientOnly>
  <SliderDemo />
</ClientOnly>

<template #source>

<<< @/examples/SliderDemo.vue

</template>

</DemoExample>

## 禁用状态

设置 `disabled` 禁止调整数值。

<DemoExample>

<ClientOnly>
  <SliderDisabledDemo />
</ClientOnly>

<template #source>

<<< @/examples/SliderDisabledDemo.vue

</template>

</DemoExample>

## Slider API {#api}

### 属性

| 属性         | 说明                         | 类型      | 默认值    |
| ------------ | ---------------------------- | --------- | --------- |
| `v-model`    | 当前数值                     | `number`  | 必填      |
| `aria-label` | 可访问名称，建议填写具体用途 | `string`  | `'数值'`  |
| `min / max`  | 数值范围                     | `number`  | `0 / 100` |
| `step`       | 步长                         | `number`  | `1`       |
| `unit`       | 辅助技术读取的数值单位       | `string`  | —         |
| `disabled`   | 禁止修改                     | `boolean` | `false`   |

### 事件

| 事件                | 说明                       |
| ------------------- | -------------------------- |
| `update:modelValue` | number，绑定值变化         |
| `input`             | number，用户调节中的数值   |
| `change`            | number，原生控件提交的数值 |
| `focus / blur`      | FocusEvent，焦点变化       |

### 实例

`focus()`、`blur()` 控制原生滑块焦点
