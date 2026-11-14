<script setup lang="ts">
import SelectBasicDemo from '../examples/SelectBasicDemo.vue'
import SelectFilterableDemo from '../examples/SelectFilterableDemo.vue'
import SelectMultipleDemo from '../examples/SelectMultipleDemo.vue'
import SelectCollapseDemo from '../examples/SelectCollapseDemo.vue'
</script>

# Select 选择器

从下拉列表中选择一项或多项。

## 基础用法

使用 `v-model` 绑定选中项的 `value`，通过 `options` 提供选项。

<DemoExample>

<ClientOnly>
  <SelectBasicDemo />
</ClientOnly>

<template #source>

<<< @/examples/SelectBasicDemo.vue

</template>

</DemoExample>

## 筛选选项 {#filterable}

设置 `filterable` 后，可直接在选择框内输入关键词，按名称或说明筛选选项。用方向键定位，按回车选中。

<DemoExample>

<ClientOnly>
  <SelectFilterableDemo />
</ClientOnly>

<template #source>

<<< @/examples/SelectFilterableDemo.vue

</template>

</DemoExample>

## 多选 {#multiple}

设置 `multiple` 可选择多项，绑定值为数组。

<DemoExample>

<ClientOnly>
  <SelectMultipleDemo />
</ClientOnly>

<template #source>

<<< @/examples/SelectMultipleDemo.vue

</template>

</DemoExample>

## 折叠标签 {#collapse-tags}

设置 `collapse-tags` 折叠已选项，搭配 `collapse-tags-tooltip` 可查看隐藏标签。

<DemoExample>

<ClientOnly>
  <SelectCollapseDemo />
</ClientOnly>

<template #source>

<<< @/examples/SelectCollapseDemo.vue

</template>

</DemoExample>

## Select API {#api}

### 属性

| 属性                                                   | 说明                                                                   | 类型                              | 默认值                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------- | ----------------------- |
| `v-model`                                              | Value 为 string 或 number；单选空值 undefined，多选空值 []，0 是有效值 | `Value \| undefined` 或 `Value[]` | 必填                    |
| `options`                                              | label、value；可选 description、disabled                               | `SelectOption<Value>[]`           | 必填                    |
| `size`                                                 | 组件尺寸                                                               | `'small' \| 'default' \| 'large'` | `'default'`             |
| `multiple`                                             | 开启多选                                                               | `boolean`                         | `false`                 |
| `disabled / loading / filterable / clearable / remote` | 禁用、加载、搜索、清空、外部筛选                                       | `boolean`                         | `false`                 |
| `placeholder / empty-text`                             | 占位和空状态                                                           | `string`                          | `'请选择' / '暂无选项'` |
| `collapse-tags / collapse-tags-tooltip`                | 折叠标签与溢出提示                                                     | `boolean`                         | `false`                 |
| `max-collapse-tags`                                    | 至少显示一个标签                                                       | `number`                          | `1`                     |

`remote` 关闭本地筛选，搜索输入完成后发送查询词；请求、取消和结果顺序由调用方管理。通过 `ZFormItem` 或 `aria-label` 为控件命名

### 事件

| 事件                         | 参数         | 说明                            |
| ---------------------------- | ------------ | ------------------------------- |
| `update:modelValue / change` | 当前模型值   | 模型变化 / 用户选择、移除或清空 |
| `clear`                      | 无           | 清空选择                        |
| `remove-tag`                 | `Value`      | 用户移除一个标签                |
| `visible-change`             | `boolean`    | 菜单显隐变化                    |
| `query-change`               | `string`     | 搜索输入完成                    |
| `focus / blur`               | `FocusEvent` | 触发控件焦点变化                |

### 插槽

- `option({ option, index, selected, disabled })`：自定义选项内容
- `empty({ search })`：无匹配选项

### 实例

`focus()`、`blur()`、`clear()`、`open()`、`close()`
