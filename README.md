<!-- prettier-ignore -->
<div align="center">

<img src="https://raw.githubusercontent.com/zyycn/codex-proxy-ui/main/playground/public/logo.svg" alt="Codex Proxy UI" width="88" height="88" />

# Codex Proxy UI

Vue 3 · TypeScript · 按需导入 · 主题定制 · 国际化

[![CI](https://github.com/zyycn/codex-proxy-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/zyycn/codex-proxy-ui/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/zyycn/codex-proxy-ui?display_name=tag&sort=semver&style=flat-square)](https://github.com/zyycn/codex-proxy-ui/releases)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)

[在线文档与演示](https://zyycn.github.io/codex-proxy-ui/) · [快速开始](#快速开始) · [组件目录](playground/components/index.md) · [版本发布](https://github.com/zyycn/codex-proxy-ui/releases) · [问题反馈](https://github.com/zyycn/codex-proxy-ui/issues)

</div>

## 特性

- **Vue 3 与 TypeScript**：基于 Composition API，提供组件属性、事件、插槽与实例的类型声明
- **常用组件**：覆盖表单、表格、日期选择、分页、弹窗、通知与 Markdown 等场景，配套交互示例和 API 文档
- **主题定制**：支持浅色、深色、预置配色和自定义主色，通过主题变量调整密度与组件外观，支持局部主题
- **表单校验**：通过 `FormRules<T>` 声明规则，支持异步校验、字段重置和标签左对齐、右对齐与顶部布局
- **按需导入**：提供 ESM、静态具名导入和组件子路径，支持 JavaScript tree-shaking
- **国际化**：内置简体中文、繁体中文与英文，可通过 ConfigProvider 设置或扩展组件文案

## 安装

需要 Vue 3.5+、Node.js 24+

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.9.1/codex-proxy-ui-0.9.1.tgz
```

包名为 `@codex-proxy/ui`，通过 [GitHub Releases](https://github.com/zyycn/codex-proxy-ui/releases) 分发，尚未发布到 npm registry。每个版本提供 `.tgz` 安装包与 `.sha256` 校验文件，提交应用锁文件以固定版本和完整性摘要

## 快速开始

### 1. 导入样式并初始化主题

在 Vue 应用的客户端入口 `src/main.ts` 中初始化主题，再挂载应用

```ts
import {
  applyTheme,
  createTheme,
} from '@codex-proxy/ui/theme'
import { createApp } from 'vue'
import App from './App.vue'
import '@codex-proxy/ui/styles.css'

applyTheme(
  document.documentElement,
  createTheme({ scheme: 'light' }),
)

createApp(App).mount('#app')
```

`styles.css` 包含基础样式与完整组件样式，使用组件无需安装 Tailwind。SSR 项目在客户端生命周期中初始化主题，详见[安装指南](playground/guide/installation.md)

### 2. 使用组件

在 `src/App.vue` 中直接导入组件，无需全局注册

```vue
<script setup lang="ts">
import { ZButton, ZCard } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <ZCard title="开始使用">
    <ZButton type="primary" @click="count++">
      已点击 {{ count }} 次
    </ZButton>
  </ZCard>
</template>
```

组件也提供独立入口，模板支持 `ZButton` 和 `z-button` 两种写法

```ts
import { ZButton } from '@codex-proxy/ui/button'
```

JavaScript 可按需裁剪，`styles.css` 为完整样式，不随组件导入裁剪

## 文档

[在线文档与 Playground](https://zyycn.github.io/codex-proxy-ui/) 提供可交互示例、源码和主题切换；固定版本的 API 可查看对应 Git 标签下的文档

| 主题                                               | 内容                                   |
| -------------------------------------------------- | -------------------------------------- |
| [安装与样式集成](playground/guide/installation.md) | 包入口、按需使用与 Tailwind CSS 4 接入 |
| [组件目录](playground/components/index.md)         | 组件示例、属性、事件、插槽与实例方法   |
| [主题定制](playground/guide/theme.md)              | 预置配色、明暗模式、局部主题与组件变量 |
| [公开 API](playground/guide/api.md)                | 公开入口、服务、组合式函数与命名约定   |
| [国际化](playground/guide/i18n.md)                 | 语言包、ConfigProvider 与自定义文案    |
| [源码联调](playground/guide/development.md)        | 在应用中使用组件源码与热更新           |
| [组件架构](playground/guide/architecture.md)       | 目录组织、公开入口与组件职责           |

## 本地开发

使用 Node.js 24+ 和 `package.json` 指定的 pnpm 版本

```bash
git clone https://github.com/zyycn/codex-proxy-ui.git
cd codex-proxy-ui
pnpm install --frozen-lockfile
pnpm dev
```

打开 [本地 Playground](http://127.0.0.1:5176)，组件与文档修改会自动热更新

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm build:playground
```

`pnpm pack` 自动构建 JavaScript、CSS 和类型声明，并生成可安装的归档。正式版本的[发布工作流](.github/workflows/release.yml)同步更新在线 Playground
