<script setup lang="ts">
import ButtonDemo from '../examples/ButtonDemo.vue'
import ButtonDisabledDemo from '../examples/ButtonDisabledDemo.vue'
import ButtonLoadingDemo from '../examples/ButtonLoadingDemo.vue'
import ButtonSizesDemo from '../examples/ButtonSizesDemo.vue'
</script>

# Button 按钮

执行操作或提交表单。

## 基础用法

使用 `type` 指定语义颜色，使用 `variant` 选择实体、轻表面、文本或链接样式

<DemoExample>

<ClientOnly>
  <ButtonDemo />
</ClientOnly>

<template #source>

<<< @/examples/ButtonDemo.vue

</template>

</DemoExample>

## 禁用状态

设置 `disabled` 禁用按钮，禁用时不触发点击事件

<DemoExample>

<ClientOnly>
  <ButtonDisabledDemo />
</ClientOnly>

<template #source>

<<< @/examples/ButtonDisabledDemo.vue

</template>

</DemoExample>

## 加载状态

操作执行期间设置 `loading`，显示加载图标并阻止重复点击

<DemoExample>

<ClientOnly>
  <ButtonLoadingDemo />
</ClientOnly>

<template #source>

<<< @/examples/ButtonLoadingDemo.vue

</template>

</DemoExample>

## 按钮尺寸

使用 `size` 选择小、默认或大尺寸

<DemoExample>

<ClientOnly>
  <ButtonSizesDemo />
</ClientOnly>

<template #source>

<<< @/examples/ButtonSizesDemo.vue

</template>

</DemoExample>

## Button API {#api}

### 属性

| 属性                 | 说明                 | 类型                                                                     | 默认值      |
| -------------------- | -------------------- | ------------------------------------------------------------------------ | ----------- |
| `type`               | 语义类型             | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `variant`            | 外观                 | `'solid' \| 'plain' \| 'text' \| 'link'`                                 | `'solid'`   |
| `size`               | 组件尺寸             | `'small' \| 'default' \| 'large'`                                        | `'default'` |
| `native-type`        | 原生按钮行为         | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  |
| `loading / disabled` | 加载与禁用均阻止点击 | `boolean`                                                                | `false`     |

### 事件

- `click(event: MouseEvent)`：用户点击，禁用或加载时不触发

### 插槽

`default`、`icon`、`loading`

### 实例

`focus()`、`blur()`、`element`（原生按钮）
