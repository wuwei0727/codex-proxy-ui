<script setup lang="ts">
import LoadingDemo from '../examples/LoadingDemo.vue'
</script>

# Loading 加载

在内容加载期间显示提示。

## 基础用法

在原生容器上使用 `v-loading`，传入布尔值控制显隐。

<DemoExample wide>

<ClientOnly>
  <LoadingDemo />
</ClientOnly>

<template #source>

<<< @/examples/LoadingDemo.vue

</template>

</DemoExample>

## 全局注册

在应用入口注册指令后，可在任意组件中使用。

```ts
import { vLoading } from '@codex-proxy/ui'

app.directive('loading', vLoading)
```

## Loading API {#api}

### 指令值

`LoadingBinding` 为 `boolean | LoadingOptions`

| LoadingOptions    | 类型      | 默认值     | 说明                         |
| ----------------- | --------- | ---------- | ---------------------------- |
| `loading`         | `boolean` | `false`    | 控制蒙层显隐                 |
| `text`            | `string`  | `'加载中'` | 加载文案，空文本使用默认值   |
| `preserveContent` | `boolean` | `false`    | 保留内容外观，移除背景与模糊 |
