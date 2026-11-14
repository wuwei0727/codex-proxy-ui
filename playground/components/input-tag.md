<script setup lang="ts">
import InputTagDemo from '../examples/InputTagDemo.vue'
import InputTagCollapseDemo from '../examples/InputTagCollapseDemo.vue'
import InputTagDragDemo from '../examples/InputTagDragDemo.vue'
import InputTagTriggerDemo from '../examples/InputTagTriggerDemo.vue'
import InputTagLimitDemo from '../examples/InputTagLimitDemo.vue'
</script>

# InputTag 标签输入

输入多个文本标签。

## 基础用法

按回车添加标签，文本中的空格和逗号会保留。输入为空时，按退格删除最后一项。

<DemoExample>

<ClientOnly>
  <InputTagDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputTagDemo.vue

</template>

</DemoExample>

## 折叠标签 {#collapse-tags}

开启 `collapse-tags` 后，放不下的标签会收进 `+N`。拖动滑块调整输入框宽度；搭配 `collapse-tags-tooltip` 可查看隐藏项。

<DemoExample>

<ClientOnly>
  <InputTagCollapseDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputTagCollapseDemo.vue

</template>

</DemoExample>

## 拖动排序 {#draggable}

开启 `draggable`，拖动标签即可更改顺序。

<DemoExample>

<ClientOnly>
  <InputTagDragDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputTagDragDemo.vue

</template>

</DemoExample>

## 空格添加 {#trigger}

设置 `trigger="Space"`，按空格即可添加关键词。

<DemoExample>

<ClientOnly>
  <InputTagTriggerDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputTagTriggerDemo.vue

</template>

</DemoExample>

## 数量限制 {#max}

使用 `max` 限制可添加的标签数。

<DemoExample>

<ClientOnly>
  <InputTagLimitDemo />
</ClientOnly>

<template #source>

<<< @/examples/InputTagLimitDemo.vue

</template>

</DemoExample>

## InputTag API {#api}

### 属性

| 属性                    | 说明                           | 类型                              | 默认值      |
| ----------------------- | ------------------------------ | --------------------------------- | ----------- |
| `v-model`               | 已确认的标签，按显示顺序排列   | `string[]`                        | `[]`        |
| `placeholder`           | 没有标签时的输入提示           | `string`                          | —           |
| `size`                  | 尺寸                           | `'small' \| 'default' \| 'large'` | `'default'` |
| `max`                   | 最多可添加的标签数             | `number`                          | 不限        |
| `trigger`               | 确认标签的按键                 | `'Enter' \| 'Space'`              | `'Enter'`   |
| `collapse-tags`         | 将一行放不下的标签折叠为 +N    | `boolean`                         | `false`     |
| `max-collapse-tags`     | 限制可见数量，空间不足时可更少 | `number`                          | 按宽度      |
| `collapse-tags-tooltip` | 展开浮层查看或移除隐藏项       | `boolean`                         | `false`     |
| `draggable`             | 可拖动可见标签改变顺序         | `boolean`                         | `false`     |
| `save-on-blur`          | 离开控件时确认草稿             | `boolean`                         | `true`      |
| `clearable`             | 提供清空按钮                   | `boolean`                         | `false`     |
| `disabled / readonly`   | 禁用或只读                     | `boolean`                         | `false`     |

`class`、`style` 作用于外层；`id`、ARIA 属性传给实际输入框，可配合 `ZFormItem` 关联标签与校验信息

### 事件

- `change(tags: string[])`：用户添加、删除、清空或重排标签
- `add-tag(tag: string)`、`remove-tag(tag: string, index: number)`：添加或删除一项
- `drag-tag(oldIndex, newIndex, position)`：排序后的索引（从 0 开始）和相对放置方向（`before` / `after`）
- `clear()`：清空标签与草稿
- `focus / blur(event: FocusEvent)`：焦点进入或离开控件

### 插槽

`prefix`、`suffix` 位于标签输入区两侧

### 实例

`focus()` 聚焦输入框，`commit()` 确认当前草稿，`clear()` 清空内容
