# 主题

组件通过 CSS Variables 使用主题，不依赖应用的状态管理、路由或 API

## 独立应用

```ts
import { applyTheme, createTheme } from '@codex-proxy/ui/theme'
import '@codex-proxy/ui/styles.css'

applyTheme(
  document.documentElement,
  createTheme({ scheme: 'light' }),
)
```

`createTheme` 是纯派生函数，返回主题标识、Seed 与完整语义 Token。Token 使用 `color-primary`、`input-bg` 等名称，不包含 CSS 前缀；`tokenOverrides` 和 `themeTokenNames` 使用相同的语义名

`applyTheme` 把 Token 转为带前缀的 CSS 变量，写入文档级样式表，并在文档根元素设置主题标识；它用于 `document.documentElement`，不用于局部容器

浏览器适配函数只在客户端调用，SSR 中应放在 `onMounted` 或客户端生命周期内。模式监听、配置保存与切换动画由应用负责

## 自定义主题前缀

默认 CSS 变量前缀为 `z`，如 `--z-color-primary`。在消费方 Vite 配置中通过 `themePrefix` 设置，变量生成与样式引用使用同一构建配置，源码联调与已安装包均适用

```ts
import CodexProxyUI from '@codex-proxy/ui/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [CodexProxyUI({ themePrefix: 'acme' })],
})
```

前缀以小写字母开头，支持小写字母、数字和连字符。更改后重新构建，运行时不切换前缀

组件导出名、DOM 类名和 utility 类名各自保持独立，例如 `ZButton`、`z-input`、`bg-z-primary`；它们引用的主题变量变为 `--acme-*`。CSS 中按默认 `--z-*` 引用变量，构建插件会转换声明与引用，并保留现有 PostCSS 配置

JavaScript 中使用 `getThemeVarName('color-primary')` 获取当前前缀下的变量名，使用 `createThemeVars(theme.tokens)` 生成可绑定到元素的 CSS 变量对象。主题配置的存储和传递始终使用语义 Token 名，不包含前缀

## 配色与密度

`createTheme(options?)` 接收 `ThemeOptions`：`preset` 选择表面材质，缺省为 `default`；`scheme` 选择明暗，`colorId` 选择品牌配色，使用 `'custom'` 时通过 `primaryColor` 传入主色 HEX。省略品牌配置时使用主题预设的推荐配色，`customization` 在预设基线上调整 Seed、组件尺寸或允许覆盖的 Token

完整主题使用 `createTheme({ colorId, ...themeProfiles[colorId], scheme })`，其中 `colorId` 为预设配色 ID。`themeProfiles` 提供推荐材质和全局、组件配置；传入不同的 `preset` 可单独切换材质

`default` 保留简洁表面，`soft` 提供圆润边缘与柔和光影，背景和文字基线均跟随品牌配色。预设的尺寸与材质派生由主题编译器负责，Card 等基础组件自动消费对应 Token，无需业务页面判断主题

```ts
import { createTheme } from '@codex-proxy/ui/theme'

const theme = createTheme({
  preset: 'soft',
  scheme: 'light',
  colorId: 'custom',
  primaryColor: '#0E7C72',
  customization: {
    seed: { fontSize: 14, controlHeight: 40, borderRadius: 10 },
    component: { tableRowHeight: 64, cardBorderRadius: 20 },
  },
})
```

输入经统一规范化：无效的 Seed 颜色覆盖被忽略，自定义主色无效时回退默认色，尺寸限制在允许范围内；`tokenOverrides` 只接受开放的组件字段，不能覆盖任意 CSS 变量。优先调整 Seed 以保留状态之间的派生关系

返回值 `Theme` 包含 `preset`、`scheme`、`colorId`、主色 `seed`、规范化的 `seedTokens` 和完整 `tokens`；预览和编辑器从同一结果读取派生值

## 局部主题

局部主题将派生的 Token 绑定到容器，不改写文档级主题

```vue
<script setup lang="ts">
import { ZButton } from '@codex-proxy/ui'
import { createTheme, createThemeVars } from '@codex-proxy/ui/theme'

const theme = createTheme({ scheme: 'dark', colorId: 'deep-teal' })
</script>

<template>
  <section :data-theme="theme.scheme" :data-theme-color="theme.colorId" :style="createThemeVars(theme.tokens)">
    <ZButton type="primary">
      局部主题按钮
    </ZButton>
  </section>
</template>
```

浮层挂到 `body` 后继承全局主题。需要局部配色时，Popover 与 DatePicker 可设置 `:teleported="false"`；Dialog 等挂到 `body` 且不支持局部挂载的浮层使用全局主题

## 深色与浅色

`createTheme` 的 `scheme` 接受 `'light'` 或 `'dark'`。跟随系统时先用 `resolveThemeScheme('system', prefersDark)` 解析模式，`prefersDark` 由应用读取系统偏好

文档顶部的主题开关可用于检查所有示例的明暗状态

## 公开 API

| 导出                                                                                          | 用途                                                 |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `createThemeSeedTokens(options?)`                                                             | 仅解析 Seed，适用于品牌色卡等无需完整主题的预览      |
| `createTheme(options?)`                                                                       | 生成独立的 `Theme`，省略配置时使用浅色与默认配色     |
| `applyTheme(root, theme)`                                                                     | 将主题应用到文档根元素                               |
| `resolveThemeScheme(mode, prefersDark)`                                                       | 将系统跟随模式解析为明暗方案                         |
| `createThemeVars(tokens)`、`getThemeVarName(name)`                                            | 生成当前构建前缀下的 CSS 变量                        |
| `isThemeMode(value)`、`isThemePresetId(value)`、`isThemeColorId(value)`                       | 校验外部或持久化配置中的枚举值                       |
| `normalizeThemeCustomization(value)`                                                          | 规范化持久化的主题覆盖配置                           |
| `supportsThemeTokenAlpha(name)`                                                               | 判断指定 Token 是否允许透明填充                      |
| `defaultThemeMode`、`defaultThemePresetId`、`defaultThemeColorId`、`defaultThemePrimaryColor` | 应用初始化和重置可复用的默认值                       |
| `themePresets`、`themeColorPresets`、`themeTokenNames`、`themePrefix`                         | 表面材质预设、品牌配色、语义 Token 名和 CSS 变量前缀 |

内部颜色派生步骤不作为公开 API；类型、参数与返回值以该版本的 TypeScript 声明为准
