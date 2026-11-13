<script setup lang="ts">
import NotificationDemo from '../examples/NotificationDemo.vue'
</script>

# Notification 消息提示

显示操作结果或状态通知。

## 基础用法

调用 `ZNotification.success()` 显示成功提示。

<DemoExample>

<ClientOnly>
  <NotificationDemo />
</ClientOnly>

<template #source>

<<< @/examples/NotificationDemo.vue

</template>

</DemoExample>

## Notification API {#api}

### 服务

创建通知返回 `{ close() }`，可手动关闭该条通知。`ZNotification.closeAll()` 关闭所有通知

| NotificationOptions | 类型               | 默认值       | 说明                               |
| ------------------- | ------------------ | ------------ | ---------------------------------- |
| `message`           | `string`           | 必填         | 通知正文                           |
| `type`              | `NotificationType` | `'info'`     | 通知类型，快捷方法固定对应类型     |
| `title`             | `string`           | 类型默认标题 | 通知标题                           |
| `duration`          | `number`           | `3000`       | 毫秒，0 表示不自动关闭             |
| `deduplicate`       | `boolean`          | `false`      | 同类型、标题、正文仍存在时复用通知 |
