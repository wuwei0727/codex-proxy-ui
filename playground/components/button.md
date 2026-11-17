<script setup lang="ts">
import ButtonDemo from '../examples/ButtonDemo.vue'
import ButtonDisabledDemo from '../examples/ButtonDisabledDemo.vue'
import ButtonLoadingDemo from '../examples/ButtonLoadingDemo.vue'
import ButtonSizesDemo from '../examples/ButtonSizesDemo.vue'
import IconButtonDemo from '../examples/IconButtonDemo.vue'
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

## 图标按钮 {#icon-button}

图标配文字使用 `ZButton` 的 `icon` 插槽。只有图标时使用 [ZIconButton](#icon-button-api)，用 `aria-label` 命名操作

<DemoExample>

<ClientOnly>
  <IconButtonDemo />
</ClientOnly>

<template #source>

<<< @/examples/IconButtonDemo.vue

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

## IconButton API {#icon-button-api}

尺寸、语义类型、原生按钮行为、加载与禁用、点击事件及实例方法与 [Button](#api) 相同。图标放在默认插槽，加载图标可用 `loading` 插槽替换

| 属性         | 说明                             | 默认值   |
| ------------ | -------------------------------- | -------- |
| `aria-label` | 按钮的可访问名称                 | —        |
| `variant`    | 与 Button 相同的外观选项         | `'text'` |
| `pressed`    | 切换按钮的布尔状态，普通按钮省略 | —        |
