<script setup lang="ts">
import InputDemo from '../examples/InputDemo.vue'
import InputFamilyDemo from '../examples/InputFamilyDemo.vue'
import InputDisabledDemo from '../examples/InputDisabledDemo.vue'
import InputClearDemo from '../examples/InputClearDemo.vue'
import InputPasswordDemo from '../examples/InputPasswordDemo.vue'
</script>

# Input 输入框

输入单行文本。

## 基础用法

使用 `v-model` 绑定输入内容。

<DemoExample>

<ClientOnly>
  <InputDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputDemo.vue

</template>

</DemoExample>

## 输入控件对照 {#field-family}

切换尺寸，对比文本、标签、选择器和日期输入框。

<ClientOnly>
  <InputFamilyDemo />
</ClientOnly>

## 禁用状态 {#disabled}

设置 `disabled` 后，输入框无法聚焦或编辑。

<DemoExample>

<ClientOnly>
  <InputDisabledDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputDisabledDemo.vue

</template>

</DemoExample>

## 可清空

设置 `clearable`，悬停或聚焦时显示清空按钮。

<DemoExample>

<ClientOnly>
  <InputClearDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputClearDemo.vue

</template>

</DemoExample>

## 密码框

使用 `show-password` 切换密码的显示与隐藏。

<DemoExample>

<ClientOnly>
  <InputPasswordDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputPasswordDemo.vue

</template>

</DemoExample>

## Input API {#api}

### 属性

| 属性                                   | 说明                         | 类型                              | 默认值      |
| -------------------------------------- | ---------------------------- | --------------------------------- | ----------- |
| `v-model`                              | 字符串值                     | `string`                          | `''`        |
| `type`                                 | 原生输入类型                 | `string`                          | `'text'`    |
| `placeholder`                          | 占位文字                     | `string`                          | `''`        |
| `size`                                 | 组件尺寸                     | `'small' \| 'default' \| 'large'` | `'default'` |
| `disabled / clearable / show-password` | 禁用、清空按钮、密码显隐按钮 | `boolean`                         | `false`     |

`id`、`name`、`required`、`readonly`、`autocomplete`、ARIA 属性传给实际 input；`class`、`style` 作用于外层。输入法组合期间保留草稿，组合完成后更新模型

### 事件

- `update:modelValue(value: string)`：模型更新
- `input(value: string)`：有效输入或清空
- `change(value: string)`：原生 change 或清空
- `clear()`：用户清空
- `focus / blur(event: FocusEvent)`：原生焦点事件

### 插槽

`prefix`、`suffix`

### 实例

`focus()`、`blur()`、`select()`、`clear()`
