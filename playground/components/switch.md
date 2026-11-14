<script setup lang="ts">
import SwitchDemo from '../examples/SwitchDemo.vue'
import SwitchTextDemo from '../examples/SwitchTextDemo.vue'
</script>

# Switch 开关

切换两种互斥状态。

## 基础用法

使用 `v-model` 绑定开关值。

<DemoExample>

<ClientOnly>
  <SwitchDemo />
</ClientOnly>

<template #source>

<<< @/examples/SwitchDemo.vue

</template>

</DemoExample>

## 文字描述

设置 `inline-prompt`，将两种状态的文字显示在开关内。

<DemoExample>

<ClientOnly>
  <SwitchTextDemo />
</ClientOnly>

<template #source>

<<< @/examples/SwitchTextDemo.vue

</template>

</DemoExample>

## Switch API {#api}

### 属性

| 属性                          | 说明                              | 类型               | 默认值  |
| ----------------------------- | --------------------------------- | ------------------ | ------- |
| `v-model`                     | 开关状态                          | `boolean`          | `false` |
| `label`                       | 可见标签；隐藏标签使用 aria-label | `string`           | —       |
| `active-text / inactive-text` | 开启与关闭文字                    | `string`           | `''`    |
| `inline-prompt`               | 在开关内部显示状态文字            | `boolean`          | `false` |
| `width`                       | 轨道宽度，数字按 px 处理          | `string \| number` | `''`    |
| `disabled`                    | 禁止修改                          | `boolean`          | `false` |

### 事件

| 事件                | 说明                      |
| ------------------- | ------------------------- |
| `update:modelValue` | boolean，绑定值变化       |
| `change`            | boolean，用户切换开关状态 |
| `focus / blur`      | FocusEvent，焦点变化      |

### 实例

`focus()`、`blur()` 控制原生开关输入框焦点
