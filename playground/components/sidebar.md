<script setup lang="ts">
import SidebarDemo from '../examples/SidebarDemo.vue'
</script>

# Sidebar 侧边栏

组合品牌区、可滚动导航与底部操作，支持展开、收起和两级菜单

## 基础用法

<DemoExample>

<ClientOnly>
  <SidebarDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZIconButton } from '@codex-proxy/ui/icon-button'
import { ZSidebar } from '@codex-proxy/ui/sidebar'
import { Box, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Puzzle } from '@lucide/vue'
import { ref } from 'vue'

const collapse = ref(false)
const activeIndex = ref('overview')
const items = [
  { index: 'overview', label: '概览', icon: LayoutDashboard },
  {
    index: 'plugins',
    label: '插件',
    icon: Puzzle,
    children: [{ index: 'installed', label: '已安装', icon: Box }],
  },
]
</script>

<template>
  <ZSidebar
    :items="items"
    :collapse="collapse"
    :default-active="activeIndex"
    :default-openeds="['plugins']"
    navigation-label="主导航"
    @select="index => activeIndex = index"
  >
    <template #brand-icon>
      <Box class="size-11" />
    </template>
    <template #brand>
      工作台
    </template>
    <template #footer>
      <ZIconButton :aria-label="collapse ? '展开侧边栏' : '收起侧边栏'" @click="collapse = !collapse">
        <PanelLeftOpen v-if="collapse" />
        <PanelLeftClose v-else />
      </ZIconButton>
    </template>
  </ZSidebar>
</template>
```

</template>

</DemoExample>

## 用法说明

菜单项使用全局唯一的 `index`，可配置 `label`、`icon`、`disabled`；顶层项通过 `children` 提供一级子菜单。展开状态下点击分组只切换子菜单，收起状态下点击分组触发该分组的 `select`，由应用决定进入哪个页面

组件维护选中项和展开状态，`default-active` 与 `default-openeds` 的后续变化会同步到内部状态。选中子项时展开其所属分组，外部属性同步不触发用户事件。组件不依赖路由、请求、权限或持久化，应用在 `select` 中执行导航或其他业务操作

组件填满父容器高度，宽度与折叠动效由组件管理。移动端断点、遮罩与模态焦点由宿主布局拥有。收起时隐藏品牌文字和菜单标签的可访问内容，菜单名称通过按钮标签与悬停提示提供；减少动态效果偏好下立即切换

表面、圆角、边缘过渡与选中状态消费主题 Token，默认预设和柔光预设使用同一组件

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
