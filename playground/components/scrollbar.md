<script setup lang="ts">
import ScrollbarDemo from '../examples/ScrollbarDemo.vue'
</script>

# Scrollbar 滚动容器

在有限的空间内滚动查看内容。

## 基础用法

设置 `height` 或 `max-height` 限制高度，通过 `horizontal` 开启横向滚动。

<DemoExample wide>

<ClientOnly>
  <ScrollbarDemo />
</ClientOnly>

<template #source>

<<< @/examples/ScrollbarDemo.vue

</template>

</DemoExample>

## 页面与外部容器

`target="document"` 将滚动条连接到页面，保留锚点跳转、目录跟随和浏览器滚动位置恢复。页面内容仍放在原有位置，组件只渲染轨道

```vue
<script setup lang="ts">
import { ZScrollbar } from '@codex-proxy/ui'
</script>

<template>
  <ZScrollbar target="document" class="page-scrollbar" />
</template>

<style scoped>
.page-scrollbar {
  position: fixed;
  inset: 0 0 0 auto;
  width: 12px;
  height: auto;
}
</style>
```

`target` 也可传入已有滚动元素，滚动条根节点的尺寸与位置应覆盖该元素的可视区域。外部容器的内容尺寸变化后调用 `update()`；页面模式自动观察正文尺寸

连接外部目标时隐藏其原生滚动条，切换目标或卸载时恢复；此模式不渲染默认插槽

## Scrollbar API {#api}

### 属性

| 属性                 | 说明                              | 类型                        | 默认值  |
| -------------------- | --------------------------------- | --------------------------- | ------- |
| `height / maxHeight` | 容器高度与最大高度，需带 CSS 单位 | `string`                    | —       |
| `horizontal`         | 允许横向滚动                      | `boolean`                   | `false` |
| `vertical`           | 允许纵向滚动                      | `boolean`                   | `true`  |
| `alwaysVisible`      | 溢出时始终显示滚动条              | `boolean`                   | `false` |
| `target`             | 已有滚动元素或整个页面            | `HTMLElement \| 'document'` | —       |

### 事件

| 事件     | 说明                                        |
| -------- | ------------------------------------------- |
| `scroll` | `{ scrollTop: number, scrollLeft: number }` |

### 插槽

| 插槽      | 说明                                     |
| --------- | ---------------------------------------- |
| `default` | 内置滚动容器的内容，未设置 target 时生效 |

### 方法

| 方法                               | 说明                                       |
| ---------------------------------- | ------------------------------------------ |
| `update()`                         | 内容尺寸变化后重算滚动条                   |
| `scrollToTop() / scrollToBottom()` | 滚动到顶部或底部，返回 `Promise<void>`     |
| `wrapRef`                          | 当前滚动元素，可读取 scrollTop、scrollLeft |
