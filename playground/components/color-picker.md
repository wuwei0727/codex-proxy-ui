<script setup lang="ts">
import ColorPickerDemo from '../examples/ColorPickerDemo.vue'
</script>

# ColorPicker 颜色选择

通过色板、预设色或颜色输入选择颜色，确认后更新绑定值

## 基础用法

<DemoExample>

<ClientOnly>
  <ColorPickerDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZColorPicker } from '@codex-proxy/ui'
import { themeColorPresets } from '@codex-proxy/ui/theme'
import { ref } from 'vue'

const color = ref('#5983F4')
const presets = themeColorPresets.map(preset => preset.seed)
</script>

<template>
  <ZColorPicker v-model="color" aria-label="主题色" :presets="presets" :allow-alpha="false" />
</template>
```

</template>

</DemoExample>

## 用法说明

`v-model` 绑定颜色字符串，`presets` 配置快捷色板，`aria-label` 提供可访问名称

`allow-alpha` 默认为 `true`，不需要透明度时设为 `false`，`disabled` 禁用交互

## ColorPicker API {#api}

### 属性

| 属性          | 说明                                    | 类型                | 默认值       |
| ------------- | --------------------------------------- | ------------------- | ------------ |
| `v-model`     | HEX 颜色值，允许透明度时可含 Alpha 通道 | `string`            | 必填         |
| `aria-label`  | 触发按钮名称                            | `string`            | `'选择颜色'` |
| `presets`     | 预设颜色                                | `readonly string[]` | `[]`         |
| `allow-alpha` | 启用透明度编辑                          | `boolean`           | `true`       |
| `disabled`    | 禁用选择器                              | `boolean`           | `false`      |

### 事件

| 事件                | 说明                         |
| ------------------- | ---------------------------- |
| `update:modelValue` | string，绑定值变化           |
| `change`            | string，用户确认颜色         |
| `focus / blur`      | FocusEvent，触发按钮焦点变化 |

### 实例

`focus()`、`blur()` 控制触发按钮焦点
