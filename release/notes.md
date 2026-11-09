# v0.9.1

## 主题修复

- 默认与柔光材质只切换表面高光、渐变和阴影，不再联动通用、卡片与侧栏圆角
- 完整主题预设和用户显式配置的字号、间距、圆角与组件尺寸保持独立

## 升级说明

未显式配置圆角的柔光主题使用通用默认值：控件 8px、卡片 18px，侧栏保持直角。控件与卡片圆角仍可分别通过 `seed.borderRadius` 和 `component.cardBorderRadius` 自定义

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.9.1/codex-proxy-ui-0.9.1.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
