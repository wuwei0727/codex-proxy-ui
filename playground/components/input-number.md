<script setup lang="ts">
import InputNumberDemo from '../examples/InputNumberDemo.vue'
import InputNumberStepDemo from '../examples/InputNumberStepDemo.vue'
</script>

# InputNumber 数字输入

输入数值，或使用按钮逐步调整。

## 基础用法

使用 `v-model` 绑定数值。

<DemoExample>

<ClientOnly>
  <InputNumberDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputNumberDemo.vue

</template>

</DemoExample>

## 步长

设置 `step` 指定每次增减的数值。

<DemoExample>

<ClientOnly>
  <InputNumberStepDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputNumberStepDemo.vue

</template>

</DemoExample>

## InputNumber API {#api}

### 属性

| 属性                  | 说明                               | 类型                              | 默认值      |
| --------------------- | ---------------------------------- | --------------------------------- | ----------- |
| `v-model`             | 有限数值，暂时清空输入不提交空值   | `number`                          | 必填        |
| `min / max`           | 提交和步进的边界                   | `number`                          | —           |
| `step`                | 步进值，支持小数与科学计数法       | `number`                          | `1`         |
| `precision`           | 0–100 的整数，提交时保留的小数位数 | `number`                          | —           |
| `controls`            | 显示步进按钮                       | `boolean`                         | `true`      |
| `disabled / readonly` | 禁止编辑和步进                     | `boolean`                         | `false`     |
| `unit`                | 显示单位                           | `string`                          | —           |
| `size`                | 组件尺寸                           | `'small' \| 'default' \| 'large'` | `'default'` |
| `aria-label`          | 可访问名称                         | `string`                          | `'数值'`    |

输入草稿在原生 change 或 blur 时提交，空草稿恢复原值。提交先按 precision 舍入，再限制到 min/max；程序赋值由调用方保证符合合同

### 事件

- `update:modelValue / change(value: number)`：提交或步进产生的数值变化
- `input(value: string)`：编辑中的原生草稿，可能为空
- `focus / blur(event: FocusEvent)`：焦点变化

### 实例

`focus()`、`blur()`
