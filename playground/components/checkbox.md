<script setup lang="ts">
import CheckboxDemo from '../examples/CheckboxDemo.vue'
import CheckboxMixedDemo from '../examples/CheckboxMixedDemo.vue'
</script>

# Checkbox 复选框

选择或取消一个选项。

## 基础用法

使用 `v-model` 绑定布尔值。

<DemoExample>

<ClientOnly>
  <CheckboxDemo />
</ClientOnly>

<template #source>

<<< @/examples/CheckboxDemo.vue

</template>

</DemoExample>

## 半选状态

使用 `indeterminate` 表示部分选中。

<DemoExample>

<ClientOnly>
  <CheckboxMixedDemo />
</ClientOnly>

<template #source>

<<< @/examples/CheckboxMixedDemo.vue

</template>

</DemoExample>

## Checkbox API {#api}

### 属性

| 属性            | 说明                              | 类型      | 默认值  |
| --------------- | --------------------------------- | --------- | ------- |
| `v-model`       | 选中状态                          | `boolean` | `false` |
| `label`         | 可见标签；隐藏标签使用 aria-label | `string`  | —       |
| `indeterminate` | 半选外观，不改写绑定值            | `boolean` | `false` |
| `disabled`      | 禁止修改                          | `boolean` | `false` |

### 事件

| 事件                | 说明                      |
| ------------------- | ------------------------- |
| `update:modelValue` | boolean，绑定值变化       |
| `change`            | boolean，用户切换选中状态 |
| `focus / blur`      | FocusEvent，焦点变化      |

### 插槽

- `label`：自定义可见标签

### 实例

`focus()`、`blur()`
