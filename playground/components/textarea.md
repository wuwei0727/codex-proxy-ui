<script setup lang="ts">
import TextareaDemo from '../examples/TextareaDemo.vue'
import TextareaAutosizeDemo from '../examples/TextareaAutosizeDemo.vue'
</script>

# Textarea 文本域

输入多行文本。

## 基础用法

通过 `rows` 设置初始行数。

<DemoExample>

<ClientOnly>
  <TextareaDemo />
</ClientOnly>

<template #source>

<<< @/examples/TextareaDemo.vue

</template>

</DemoExample>

## 自适应高度

设置 `autosize` 使文本域随内容增高。

<DemoExample>

<ClientOnly>
  <TextareaAutosizeDemo />
</ClientOnly>

<template #source>

<<< @/examples/TextareaAutosizeDemo.vue

</template>

</DemoExample>

## Textarea API {#api}

### 属性

| 属性          | 说明                             | 类型                                                | 默认值       |
| ------------- | -------------------------------- | --------------------------------------------------- | ------------ |
| `v-model`     | 字符串值                         | `string`                                            | `''`         |
| `placeholder` | 占位文字                         | `string`                                            | `''`         |
| `size`        | 组件尺寸                         | `'small' \| 'default' \| 'large'`                   | `'default'`  |
| `rows`        | 初始行数和 autosize 默认最小行数 | `number`                                            | `5`          |
| `autosize`    | 随内容与宽度调整高度             | `boolean \| { minRows?: number, maxRows?: number }` | `false`      |
| `resize`      | 拖动方向，autosize 时关闭拖动    | `'none' \| 'both' \| 'horizontal' \| 'vertical'`    | `'vertical'` |
| `disabled`    | 禁用输入                         | `boolean`                                           | `false`      |

原生属性与 ARIA 属性传给 textarea，外层接收 class、style。输入法组合完成后更新模型

### 事件

- `update:modelValue / input / change(value: string)`：模型、输入与提交变化
- `focus / blur(event: FocusEvent)`：焦点变化

### 实例

`focus()`、`blur()`、`select()`、`clear()`
