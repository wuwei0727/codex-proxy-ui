<script setup lang="ts">
import TagDemo from '../examples/TagDemo.vue'
import TagCloseDemo from '../examples/TagCloseDemo.vue'
</script>

# Tag 标签

用标签标记状态或分类。

## 基础用法

使用默认插槽设置标签文字。

<DemoExample>

<ClientOnly>
  <TagDemo />
</ClientOnly>

<template #source>

<<< @/examples/TagDemo.vue

</template>

</DemoExample>

## 可移除标签

设置 `closable`，在 `close` 事件中更新标签列表。

<DemoExample>

<ClientOnly>
  <TagCloseDemo />
</ClientOnly>

<template #source>

<<< @/examples/TagCloseDemo.vue

</template>

</DemoExample>

## Tag API {#api}

### 属性

| 属性                          | 说明                                     | 类型                                                                     | 默认值      |
| ----------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ | ----------- |
| `type`                        | 状态样式                                 | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `size`                        | 尺寸                                     | `'small' \| 'default' \| 'large'`                                        | `'default'` |
| `round / closable / disabled` | 圆角、关闭按钮与禁用状态                 | `boolean`                                                                | `false`     |
| `closeLabel`                  | 关闭按钮名称，默认由“移除”和标签内容组合 | `string`                                                                 | —           |

### 事件

| 事件    | 说明                                     |
| ------- | ---------------------------------------- |
| `close` | MouseEvent，只通知关闭，由调用方移除标签 |

### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 标签内容 |
