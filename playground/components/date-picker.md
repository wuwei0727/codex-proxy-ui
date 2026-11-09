<script setup lang="ts">
import DatePickerDemo from '../examples/DatePickerDemo.vue'
</script>

# DatePicker 日期选择器

选择日期、周、月份、年份、季度或日期时间，支持多选和范围选择

## 基础用法

<DemoExample>

<ClientOnly>
  <DatePickerDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import type { DatePickerValue } from '@codex-proxy/ui/date-picker'
import { ZDatePicker } from '@codex-proxy/ui/date-picker'
import { ref } from 'vue'

const dates = ref<DatePickerValue>(null)
</script>

<template>
  <ZDatePicker
    v-model="dates"
    type="daterange"
    value-format="YYYY-MM-DD"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    aria-label="查询日期"
    :disabled-date="date => date.getTime() > Date.now()"
  />
</template>
```

</template>

</DemoExample>

## 用法说明

默认宽度：单值和年份范围 `220px`，月份、季度范围 `300px`，日期范围 `350px`，日期时间范围 `400px`。窄容器内自动收缩，可通过 `class / style` 覆盖宽度

`ZDatePicker` 支持日期、时间、多选和范围选择，使用本库主题、表单和浮层

语言默认继承最近的 `ZConfigProvider`，未配置时使用英文。通过 `locale` 传入 `UiLocale` 语言包可单独覆盖，语言包导入与响应式切换见[国际化](../guide/i18n.md)

不设置 `value-format` 时输出 `Date`，设置后输出对应格式的字符串，`value-format="x"` 输出毫秒时间戳数字。范围使用两个值的数组，多选使用数组，清空默认返回 `null`。`format` 只影响输入框的展示与解析

日历按浏览器本地时区选择日期，不转换宿主的部署时区。`default-value` 只设置空值时的日历位置，`default-time` 为日期选择补齐时间，不会自动写入模型

日期范围首次点击只更新草稿，第二次点击确定范围，反向选择自动排序。多选和日期时间保持面板打开，确认或关闭后触发 `change`，外部更新模型不触发用户事件。禁用日期同时限制点击、手动输入和快捷选项，非法输入恢复原值

范围选择在同一输入框内编辑起止日期。`:clearable="false"` 隐藏清空按钮；不传 `shortcuts` 或传空数组时，不显示左侧快捷选项区

输入框按 ↓ 进入日历，日历支持方向键、Home / End 和 PageUp / PageDown，Shift + PageUp / PageDown 跨年。Enter 选择，Esc 关闭并返回输入框。通过 `ZFormItem` 或 `aria-label` 提供名称

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
