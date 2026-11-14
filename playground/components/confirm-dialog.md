<script setup lang="ts">
import ConfirmDialogDemo from '../examples/ConfirmDialogDemo.vue'
</script>

# ConfirmDialog 确认弹窗

在执行操作前请求确认。

## 基础用法

监听 `confirm` 执行操作，成功后将 `v-model` 设为 `false`。

<DemoExample wide>

<ClientOnly>
  <ConfirmDialogDemo />
</ClientOnly>

<template #source>

<<< @/examples/ConfirmDialogDemo.vue

</template>

</DemoExample>

## ConfirmDialog API {#api}

### 属性

| 属性                         | 说明               | 类型      | 默认值            |
| ---------------------------- | ------------------ | --------- | ----------------- |
| `v-model`                    | 控制打开状态       | `boolean` | `false`           |
| `title`                      | 确认标题           | `string`  | 必填              |
| `description`                | 确认说明           | `string`  | —                 |
| `destructive`                | 使用危险操作样式   | `boolean` | `false`           |
| `confirm-text / cancel-text` | 操作按钮文案       | `string`  | `'确认' / '取消'` |
| `loading`                    | 阻止重复确认和关闭 | `boolean` | `false`           |
| `confirm-disabled`           | 禁用确认按钮       | `boolean` | `false`           |

### 事件

| 事件                | 说明                                                      |
| ------------------- | --------------------------------------------------------- |
| `update:modelValue` | boolean，打开状态变化                                     |
| `confirm`           | 点击确认时触发，由调用方完成操作并关闭                    |
| `cancel`            | 点击取消按钮时触发，遮罩、Escape 和关闭图标只更新打开状态 |
| `open / close`      | 打开 / 关闭开始                                           |
| `opened`            | 入场动画完成                                              |
| `closed`            | 退出动画完成后触发，可执行必要的业务收尾                  |

### 插槽

| 插槽      | 说明         |
| --------- | ------------ |
| `default` | 补充确认内容 |
