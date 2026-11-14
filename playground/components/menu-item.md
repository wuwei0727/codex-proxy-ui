<script setup lang="ts">
import MenuItemDemo from '../examples/MenuItemDemo.vue'
</script>

# MenuItem 菜单项

在菜单中展示可执行的操作。

## 基础用法

在默认插槽中填写操作名称，使用 `icon` 插槽添加图标。

<DemoExample wide>

<ClientOnly>
  <MenuItemDemo />
</ClientOnly>

<template #source>

<<< @/examples/MenuItemDemo.vue

</template>

</DemoExample>

## MenuItem API {#api}

### 属性

| 属性                 | 说明                 | 类型                    | 默认值      |
| -------------------- | -------------------- | ----------------------- | ----------- |
| `type`               | 普通或危险操作       | `'default' \| 'danger'` | `'default'` |
| `disabled / loading` | 禁用或加载时阻止点击 | `boolean`               | `false`     |

### 事件

| 事件    | 说明                                  |
| ------- | ------------------------------------- |
| `click` | 原生 MouseEvent，加载与禁用时不会触发 |

### 插槽

| 插槽             | 说明               |
| ---------------- | ------------------ |
| `default`        | 菜单文字           |
| `icon / loading` | 普通图标或加载图标 |
