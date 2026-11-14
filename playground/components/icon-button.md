<script setup lang="ts">
import IconButtonDemo from '../examples/IconButtonDemo.vue'
</script>

# IconButton 图标按钮

用一个图标表示按钮操作。

## 基础用法

将图标放入默认插槽，通过 `aria-label` 说明按钮用途。

<DemoExample>

<ClientOnly>
  <IconButtonDemo />
</ClientOnly>

<template #source>

<<< @/examples/IconButtonDemo.vue

</template>

</DemoExample>

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
