<script setup lang="ts">
import DatePickerDemo from '../examples/DatePickerDemo.vue'
import DatePickerRangeDemo from '../examples/DatePickerRangeDemo.vue'
import DatePickerTimeDemo from '../examples/DatePickerTimeDemo.vue'
</script>

# DatePicker 日期选择器

选择日期、时间或日期范围。

## 基础用法

使用 `v-model` 绑定选中的日期。

<DemoExample>

<ClientOnly>
  <DatePickerDemo />
</ClientOnly>

<template #source>

<<< @/examples/DatePickerDemo.vue

</template>

</DemoExample>

## 日期格式

`format` 控制显示格式，`value-format` 控制绑定值。默认返回 `Date`，使用 `value-format="YYYY-MM-DD"` 返回日期字符串，使用 `x` 返回毫秒时间戳。日期按浏览器本地时区处理。

## 日期范围

设置 `type="daterange"`，依次选择开始和结束日期。

<DemoExample>

<ClientOnly>
  <DatePickerRangeDemo />
</ClientOnly>

<template #source>

<<< @/examples/DatePickerRangeDemo.vue

</template>

</DemoExample>

## 日期时间

设置 `type="datetime"`，可同时选择日期和时间。

<DemoExample>

<ClientOnly>
  <DatePickerTimeDemo />
</ClientOnly>

<template #source>

<<< @/examples/DatePickerTimeDemo.vue

</template>

</DemoExample>

## DatePicker API {#api}

### 属性

| 属性                                  | 说明                                                                                                                                                      | 类型                                                                            | 默认值               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------- |
| `v-model`                             | 绑定值                                                                                                                                                    | `Date \| string \| number \| (Date \| string \| number)[] \| null \| undefined` | `undefined`          |
| `type`                                | `date / dates / week / month / months / year / years / quarter / quarters / datetime / daterange / datetimerange / monthrange / yearrange / quarterrange` | `DatePickerType`                                                                | `'date'`             |
| `size`                                | 输入框尺寸                                                                                                                                                | `'small' \| 'default' \| 'large'`                                               | `'default'`          |
| `disabled / readonly`                 | 禁用 / 只读，均不可修改或打开面板                                                                                                                         | `boolean`                                                                       | `false`              |
| `editable / clearable`                | 允许输入 / 显示清空按钮                                                                                                                                   | `boolean`                                                                       | `true`               |
| `placeholder`                         | 单值占位                                                                                                                                                  | `string`                                                                        | `''`                 |
| `start-placeholder / end-placeholder` | 范围起止占位                                                                                                                                              | `string`                                                                        | `''`                 |
| `format / value-format`               | Day.js 展示格式 / 绑定格式                                                                                                                                | `string`                                                                        | 按类型 / 无          |
| `range-separator`                     | 范围分隔符                                                                                                                                                | `string`                                                                        | `'-'`                |
| `default-value / default-time`        | 默认日历日期 / 选择日期时的时间                                                                                                                           | `Date \| [Date, Date]`                                                          | 无                   |
| `disabled-date`                       | 禁用日期，月、季、年在整个周期不可选时禁用                                                                                                                | `(date: Date) => boolean`                                                       | 无                   |
| `cell-class-name`                     | 单元格类名                                                                                                                                                | `(date: Date) => string`                                                        | 无                   |
| `shortcuts`                           | 快捷选择                                                                                                                                                  | `{ text: string, value: Date \| Date[] \| (() => Date \| Date[]) }[]`           | `[]`                 |
| `unlink-panels / single-panel`        | 范围面板独立导航 / 只显示一个面板                                                                                                                         | `boolean`                                                                       | `false`              |
| `show-week-number`                    | 显示周数，周选择始终显示                                                                                                                                  | `boolean`                                                                       | `false`              |
| `show-footer / show-confirm`          | 多选和日期时间的底栏 / 确认按钮                                                                                                                           | `boolean`                                                                       | `true`               |
| `automatic-dropdown`                  | 输入框聚焦时打开                                                                                                                                          | `boolean`                                                                       | `true`               |
| `validate-event`                      | 触发表单校验                                                                                                                                              | `boolean`                                                                       | `true`               |
| `teleported`                          | 将面板传送到 body                                                                                                                                         | `boolean`                                                                       | `true`               |
| `placement`                           | 复用 Popover 定位与边界处理                                                                                                                               | `PopoverPlacement`                                                              | `'bottom-start'`     |
| `popper-class / popper-style`         | 面板正文类名 / 样式                                                                                                                                       | `string / CSSProperties`                                                        | 无                   |
| `prefix-icon / clear-icon`            | 自定义图标                                                                                                                                                | `Component \| string`                                                           | 日历或时钟 / X       |
| `value-on-clear`                      | 清空时输出的值                                                                                                                                            | `DatePickerValue \| (() => DatePickerValue)`                                    | `null`               |
| `locale`                              | 组件语言包，支持 `en`、`zhHans`、`zhHant`，不接受 Day.js locale 字符串                                                                                    | `UiLocale`                                                                      | 继承 Provider 或英文 |

默认展示格式：日期 `YYYY-MM-DD`、月份 `YYYY-MM`、年份 `YYYY`、季度 `YYYY-[Q]Q`、日期时间 `YYYY-MM-DD HH:mm:ss`。周格式随语言包变化，英文为 `gggg [Week] ww`，简体和繁体中文为 `gggg [第] ww [周]`

原生 `id / name` 接收字符串，范围结束输入框 ID 自动追加 `-end`。时间通过原生时间输入控件编辑

### 事件

| 事件                | 参数                                             | 说明                                |
| ------------------- | ------------------------------------------------ | ----------------------------------- |
| `update:modelValue` | `DatePickerValue`                                | 有效选择、输入、快捷选择或清空      |
| `change`            | `DatePickerValue`                                | 确认或关闭时值有变化，清空立即触发  |
| `clear`             | 无                                               | 用户清空                            |
| `focus / blur`      | `FocusEvent`                                     | 输入框焦点变化                      |
| `visible-change`    | `boolean`                                        | 面板显隐变化                        |
| `calendar-change`   | `[Date \| null, Date \| null]`                   | 范围选择进度，未选择结束值时为 null |
| `panel-change`      | `Date \| Date[], DatePickerView, DatePickerView` | 导航后的面板日期、当前模式与视图    |

### 插槽

- `default(cell: DatePickerCell)`：单元格内容，包含 `date`、`dayjs`、`text`、`renderText`、`isSelected`、`disabled`、`inRange`、`start`、`end` 等状态
- `range-separator`：范围分隔内容
- `prev-month / next-month / prev-year / next-year`：导航图标

### 实例

`focus()`、`blur()`、`handleOpen()`、`handleClose()`
