<script setup lang="ts">
import RadioDemo from '../examples/RadioDemo.vue'
import RadioDisabledDemo from '../examples/RadioDisabledDemo.vue'
</script>

# Radio 单选框

从一组选项中选择一项。

## 基础用法

同组单选框使用相同的 `name` 和 `v-model`，每项设置不同的 `value`。

<DemoExample>

<ClientOnly>
  <RadioDemo />
</ClientOnly>

<template #source>

<<< @/examples/RadioDemo.vue

</template>

</DemoExample>

## 禁用状态

使用 `disabled` 禁用指定选项。

<DemoExample>

<ClientOnly>
  <RadioDisabledDemo />
</ClientOnly>

<template #source>

<<< @/examples/RadioDisabledDemo.vue

</template>

</DemoExample>

## Radio API {#api}

### 属性

| 属性           | 说明                                      | 类型               | 默认值  |
| -------------- | ----------------------------------------- | ------------------ | ------- |
| `v-model`      | 当前选中值                                | `string \| number` | 必填    |
| `value`        | 选项值，与模型使用相同的值类型            | `string \| number` | 必填    |
| `name / label` | 分组名和可见标签；隐藏名称使用 aria-label | `string`           | —       |
| `disabled`     | 禁用此选项                                | `boolean`          | `false` |

### 事件

| 事件                | 说明                           |
| ------------------- | ------------------------------ |
| `update:modelValue` | string 或 number，绑定值变化   |
| `change`            | string 或 number，用户选中此项 |
| `focus / blur`      | FocusEvent，焦点变化           |

### 插槽

| 插槽      | 说明                         |
| --------- | ---------------------------- |
| `default` | 自定义可见标签，优先于 label |

### 实例

`focus()`、`blur()` 控制原生单选框焦点
