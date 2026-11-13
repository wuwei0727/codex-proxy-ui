<script setup lang="ts">
import ColorPickerDemo from '../examples/ColorPickerDemo.vue'
import ColorPickerAlphaDemo from '../examples/ColorPickerAlphaDemo.vue'
</script>

# ColorPicker 颜色选择

从色板选择颜色，也可以直接输入色值。

## 基础用法

使用 `v-model` 绑定颜色字符串，点击确认后更新。

<DemoExample>

<ClientOnly>
  <ColorPickerDemo />
</ClientOnly>

<template #source>

<<< @/examples/ColorPickerDemo.vue

</template>

</DemoExample>

## 透明度

开启 `allow-alpha` 可调整颜色的不透明度。

<DemoExample>

<ClientOnly>
  <ColorPickerAlphaDemo />
</ClientOnly>

<template #source>

<<< @/examples/ColorPickerAlphaDemo.vue

</template>

</DemoExample>

## ColorPicker API {#api}

### 属性

| 属性          | 说明                                    | 类型                | 默认值       |
| ------------- | --------------------------------------- | ------------------- | ------------ |
| `v-model`     | HEX 颜色值，允许透明度时可含 Alpha 通道 | `string`            | 必填         |
| `aria-label`  | 触发按钮名称                            | `string`            | `'选择颜色'` |
| `presets`     | 预设颜色                                | `readonly string[]` | `[]`         |
| `allow-alpha` | 启用透明度编辑                          | `boolean`           | `true`       |
| `disabled`    | 禁用选择器                              | `boolean`           | `false`      |

### 事件

| 事件                | 说明                         |
| ------------------- | ---------------------------- |
| `update:modelValue` | string，绑定值变化           |
| `change`            | string，用户确认颜色         |
| `focus / blur`      | FocusEvent，触发按钮焦点变化 |

### 实例

`focus()`、`blur()` 控制触发按钮焦点
