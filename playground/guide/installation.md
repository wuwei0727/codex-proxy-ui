# 安装与按需使用

从 GitHub Release 安装固定版本，包名与导入路径保持 `@codex-proxy/ui`

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.9.0/codex-proxy-ui-0.9.0.tgz
```

提交消费方锁文件以固定下载地址和完整性摘要，Release 提供独立的 `.sha256` 校验文件
当前不通过 npm registry 分发，已发布包的 API 以对应标签的文档为准。本地开发可使用 `pnpm pack` 或[源码联调](./development.md)

## 组件入口

根入口支持静态具名导入和 tree-shaking，也提供独立组件入口

```ts
import { ZButton } from '@codex-proxy/ui'
// 或只加载指定组件入口
import { ZButton as Button } from '@codex-proxy/ui/button'
import '@codex-proxy/ui/styles.css'
```

Vue 作为 peer dependency，不打进 UI 包

在应用客户端入口按[主题指南](./theme.md)初始化主题变量，SSR 应在客户端生命周期内调用，不要在服务端访问 `document`

## 样式边界

JavaScript 入口不自动加载全库样式，纯主题或工具导入不会带入组件 CSS

`styles.css` 是共享基线与完整 utility 样式，需要显式导入一次；它不是随 JavaScript 自动裁剪的逐组件 CSS

使用 Tailwind CSS 4 编写页面时，在消费方 CSS 中加入主题映射

```css
@import 'tailwindcss/theme.css' layer(theme);
@import '@codex-proxy/ui/tailwind.css';
@import 'tailwindcss/utilities.css' layer(utilities);
```

## 公共过渡动画

导入 `@codex-proxy/ui/styles.css` 后，在 Vue `Transition` 的 `name` 中使用公共名称，无需逐个声明进出场类

| 名称            | 效果与用途                                         |
| --------------- | -------------------------------------------------- |
| `z-fade`        | 淡入淡出，用于 Popover 浮层、提示和状态切换        |
| `z-slide-fade`  | 轻微向下滑入、淡出，用于 Select 和 DatePicker 浮层 |
| `z-zoom-in-top` | 从顶部纵向展开、收起，用于表单错误提示             |

```vue
<Transition name="z-fade">
  <p v-if="visible">提示内容</p>
</Transition>
```

三种过渡时长均为 150ms，只改变透明度和变换，不改变布局高度；系统启用 `prefers-reduced-motion: reduce` 时关闭过渡

## 类型

所有公开入口提供类型声明，组件采用 Vue SFC 与 `<script setup lang="ts">`
