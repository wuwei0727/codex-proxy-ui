# v0.10.0

## 主题预设

- 切换内置预设或自定义主色时，成功、警告、错误、信息和链接色保持不变。正文和背景基色默认只随明暗模式切换
- 编辑器可调用 `resolveThemeProfile(colorId, currentSeed)` 切换预设：预设显式声明的颜色生效，未声明的颜色保留用户设置。预设仍可使用完整的 `ThemeCustomization`

## 升级说明

移除 `ThemeColorPreset.appearance` 和 `ThemeAppearanceSeed`。需要指定正文或背景色时，在 `customization.seed` 中设置 `colorTextBase` 或 `colorBgBase`；需要区分明暗时，按当前 `scheme` 传入对应值

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.10.0/codex-proxy-ui-0.10.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
