<script setup lang="ts">
import CardDemo from '../examples/CardDemo.vue'
</script>

# Card 卡片

组织同一主题的标题、说明与内容

## 基础用法

<DemoExample>

<ClientOnly>
  <CardDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZCard } from '@codex-proxy/ui'
</script>

<template>
  <ZCard title="请求工作台" description="管理页面与请求中间件">
    <p>将相关内容放在同一张卡片中</p>
  </ZCard>
</template>
```

</template>

</DemoExample>

## 用法说明

`padding` 控制内容间距，`actions` 插槽承载卡片操作。标题和操作区放不下时换行，操作区最大宽度为卡片内容宽度；内容需要完整展示时避免固定卡片高度

卡片表面由主题统一控制：默认预设使用纯色与轻量阴影，`soft` 预设使用表面高光与分层阴影，业务组件无需设置额外属性

## Card API {#api}

### 属性

| 属性                  | 说明       | 类型                               | 默认值      |
| --------------------- | ---------- | ---------------------------------- | ----------- |
| `as`                  | 根元素标签 | `keyof HTMLElementTagNameMap`      | `'section'` |
| `padding`             | 内容间距   | `'none' \| 'compact' \| 'default'` | `'default'` |
| `title / description` | 标题与说明 | `string`                           | —           |

### 插槽

| 插槽                  | 说明                |
| --------------------- | ------------------- |
| `default / body`      | 主体内容，body 优先 |
| `title / description` | 替换标题或说明文字  |
| `actions`             | 标题右侧操作        |
| `header`              | 替换整个头部        |
