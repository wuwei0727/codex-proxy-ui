<script setup lang="ts">
import SidebarDemo from '../examples/SidebarDemo.vue'
</script>

# Sidebar 侧边栏

使用侧边栏组织分组导航。

## 基础用法

每项使用唯一的 `index`；通过 `children` 添加子菜单，监听 `select` 处理导航。

<DemoExample wide>

<ClientOnly>
  <SidebarDemo />
</ClientOnly>

<template #source>

<<< @/examples/SidebarDemo.vue

</template>

</DemoExample>

收起时点击分组会触发该分组的 `select`；展开时点击分组可显示子菜单。

## Sidebar API {#api}

### 属性

| 属性               | 说明                                                          | 类型            | 默认值    |
| ------------------ | ------------------------------------------------------------- | --------------- | --------- |
| `items`            | 两级菜单数据，顶层为 `SidebarItem`，子项为 `SidebarChildItem` | `SidebarItem[]` | 必填      |
| `collapse`         | 是否收起侧边栏                                                | `boolean`       | `false`   |
| `compact`          | 使用紧凑的品牌、导航及底部间距，适配较窄侧栏                  | `boolean`       | `false`   |
| `width`            | 展开宽度，支持 CSS 长度                                       | `string`        | `'251px'` |
| `collapse-width`   | 收起宽度，支持 CSS 长度                                       | `string`        | `'88px'`  |
| `default-active`   | 当前选中项的 index                                            | `string`        | `''`      |
| `default-openeds`  | 展开的分组 index                                              | `string[]`      | `[]`      |
| `navigation-label` | 内部 nav 的可访问名称                                         | `string`        | —         |

### 事件

| 事件     | 说明                                                          |
| -------- | ------------------------------------------------------------- |
| `select` | 用户选择菜单项，参数为 `index: string`、`indexPath: string[]` |
| `open`   | 分组展开，参数为 `index: string`、`indexPath: string[]`       |
| `close`  | 分组收起，参数为 `index: string`、`indexPath: string[]`       |

### 插槽

| 插槽         | 说明                 |
| ------------ | -------------------- |
| `brand-icon` | 收起后保留的品牌图标 |
| `brand`      | 展开时显示的品牌文字 |
| `footer`     | 固定底部操作区       |

各插槽接收 `{ collapse: boolean }`，底部按钮的业务状态与动作由调用方提供

### 实例

| 方法                               | 说明                      |
| ---------------------------------- | ------------------------- |
| `open(index: string)`              | 展开指定分组              |
| `close(index: string)`             | 收起指定分组              |
| `updateActiveIndex(index: string)` | 更新选中项，不触发 select |
