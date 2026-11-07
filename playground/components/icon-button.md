<script setup lang="ts">
import IconButtonDemo from '../examples/IconButtonDemo.vue'
</script>

# IconButton 图标按钮

在紧凑空间中呈现单一操作

## 基础用法

<DemoExample>

<ClientOnly>
  <IconButtonDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZIconButton } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <ZIconButton aria-label="刷新配置" @click="count++">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M20 7v5h-5M4 17v-5h5M6.1 6.1A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.9 5.9" />
    </svg>
  </ZIconButton>
  <output aria-label="刷新次数">{{ count }}</output>
</template>
```

</template>

</DemoExample>

## 用法说明

使用 `aria-label` 提供可访问名称，组件不会据此生成原生提示。需要可见说明时组合 `ZPopover`；原生提示可通过 `title` 显式传入

内置加载图标与未指定尺寸的 Lucide 图标随 `size` 缩放，自定义 SVG 的尺寸由调用方设置

## IconButton API {#api}

### 属性

| 属性                 | 说明                 | 类型                                                                     | 默认值      |
| -------------------- | -------------------- | ------------------------------------------------------------------------ | ----------- |
| `aria-label`         | 提供可访问名称       | `string`                                                                 | —           |
| `type`               | 语义类型             | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `variant`            | 外观                 | `'solid' \| 'plain' \| 'text' \| 'link'`                                 | `'text'`    |
| `size`               | 组件尺寸             | `'small' \| 'default' \| 'large'`                                        | `'default'` |
| `native-type`        | 原生按钮行为         | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  |
| `loading / disabled` | 加载与禁用均阻止点击 | `boolean`                                                                | `false`     |
| `pressed`            | 切换动作的按下状态   | `boolean`                                                                | `false`     |

### 事件

- `click(event: MouseEvent)`：用户点击

### 插槽

`default`、`loading`

### 实例

`focus()`、`blur()`、`element`
