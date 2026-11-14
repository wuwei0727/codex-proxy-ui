<script setup lang="ts">
import FormDemo from '../examples/FormDemo.vue'
</script>

# Form 表单

收集和校验表单数据。

## 基础用法

将字段放在 `ZFormItem` 中，使用 `v-model` 绑定表单数据。

<DemoExample wide>

<ClientOnly>
  <FormDemo />
</ClientOnly>

<template #source>

<<< @/examples/FormDemo.vue

</template>

</DemoExample>

## 标签对齐

设置 `label-position` 调整标签位置。水平布局使用 `label-width="auto"` 可按最长标签对齐。多个控件共用一个标签时，需分别提供可访问名称。

## 校验规则

通过 `rules` 设置[校验规则](https://github.com/react-component/async-validator#rules)，使用 `trigger` 指定 `blur` 或 `change`。调用 `validate()` 可检查整个表单。

## Form API {#api}

### 属性 {#zform}

| 属性                       | 说明                             | 类型                               | 默认值                 |
| -------------------------- | -------------------------------- | ---------------------------------- | ---------------------- |
| `model`                    | 校验与重置操作的业务模型         | `object`                           | —                      |
| `rules`                    | 按字段路径配置的规则             | `FormRules<T>`                     | —                      |
| `label-position`           | 标签位置                         | `'left' \| 'right' \| 'top'`       | `'top'`                |
| `label-width`              | 横向标签列宽度                   | `string \| number`                 | `'auto'`               |
| `show-message`             | 显示字段错误信息                 | `boolean`                          | `true`                 |
| `validate-on-rule-change`  | 规则变化时重新校验               | `boolean`                          | `true`                 |
| `scroll-to-error`          | 提交校验失败时滚动到首个错误字段 | `boolean`                          | `false`                |
| `scroll-into-view-options` | 滚动选项                         | `boolean \| ScrollIntoViewOptions` | `{ block: 'nearest' }` |
| `focus-on-error`           | 提交校验失败时聚焦首个错误字段   | `boolean`                          | `false`                |

原生 form 属性透传，submit 阻止浏览器默认提交。使用组件校验时设置 `novalidate`，避免原生校验先拦截提交；保存操作由调用方执行

### 事件

| 事件       | 说明               | 参数                     |
| ---------- | ------------------ | ------------------------ |
| `validate` | 字段完成校验后触发 | `prop, isValid, message` |

### 插槽

| 插槽      | 说明             |
| --------- | ---------------- |
| `default` | 表单字段与操作区 |

### 实例

| 方法或属性                         | 合同                                     |
| ---------------------------------- | ---------------------------------------- |
| `validate(callback?)`              | 校验全部字段，返回 `Promise<boolean>`    |
| `validateField(props?, callback?)` | 校验全部或指定字段                       |
| `resetFields(props?)`              | 恢复字段初值并清空组件校验状态           |
| `clearValidate(props?)`            | 清空全部或指定字段的组件错误，不修改模型 |
| `scrollToField(prop)`              | 滚动到字段                               |
| `focusField(prop)`                 | 聚焦实际控件                             |
| `fields / getField(prop)`          | 已登记字段列表 / 指定字段上下文          |
| `setInitialValues(model)`          | 更新重置基准，不修改当前模型             |

未传 callback 时，校验通过 resolve `true`，失败 reject 按字段组织的错误对象；传入 callback 时调用 `(isValid, invalidFields?)`，失败 resolve `false`。后一次校验、清空或卸载使旧的异步结果失效，被取代的校验返回 `false`

`props` 支持字段名、字段名列表或嵌套路径列表，如 `['name', 'user.email']`、`[['user', 'email']]`；省略或空数组表示全部字段

初值在字段首次挂载时记录，临时卸载后继续保留。异步加载模型后可调用 `setInitialValues(model)` 更新基准；重置直接修改传入模型，模型需可写

`clearValidate` 不修改调用方提供的 `error / validate-status`

## FormItem API

### 属性 {#zformitem}

| 属性                          | 说明                                               | 类型                                         | 默认值     |
| ----------------------------- | -------------------------------------------------- | -------------------------------------------- | ---------- |
| `prop`                        | 模型字段路径，如 `user.name` 或 `['user', 'name']` | `string \| string[]`                         | —          |
| `rules`                       | 与表单规则合并的字段规则                           | `FormRule \| FormRule[]`                     | —          |
| `label-position`              | 标签位置                                           | `'' \| 'left' \| 'right' \| 'top'`           | 继承 Form  |
| `label-width`                 | 标签列宽度                                         | `string \| number`                           | 继承 Form  |
| `for`                         | 标签关联的控件 ID                                  | `string`                                     | 自动关联   |
| `label / description / error` | 标签、帮助与外部错误；外部错误优先                 | `string`                                     | —          |
| `required`                    | 覆盖必填规则与标记                                 | `boolean`                                    | 由规则推导 |
| `show-message`                | 显示错误信息                                       | `boolean`                                    | 继承 Form  |
| `validate-status`             | 外部校验状态                                       | `'' \| 'validating' \| 'success' \| 'error'` | 自动       |

### 插槽

| 插槽          | 说明             |
| ------------- | ---------------- |
| `default`     | 字段控件         |
| `label`       | 自定义标签       |
| `label-extra` | 标签旁的辅助内容 |
| `extra`       | 字段辅助内容     |

### 实例

| 方法或属性                                     | 说明                       |
| ---------------------------------------------- | -------------------------- |
| `validate(trigger?, callback?)`                | 校验当前字段               |
| `resetField()`                                 | 恢复字段初值并清空校验状态 |
| `clearValidate()`                              | 清空组件维护的校验状态     |
| `setInitialValue(value)` / `getInitialValue()` | 设置或读取重置基准         |
| `focus()`                                      | 聚焦字段控件               |
| `scrollIntoView(options?)`                     | 滚动到当前字段             |
| `validateState` / `validateMessage`            | 当前校验状态与提示         |
| `fieldValue`                                   | 当前字段值                 |
