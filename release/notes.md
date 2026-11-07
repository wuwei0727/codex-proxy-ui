# v0.8.1

## 新增功能

- Markdown 代码块支持一键复制

## 优化改进

- Popover 和 Select 使用跟随主题的轻阴影，在同色背景上保持无边轮廓
- 缩短表格列排序说明

## 问题修复

- Select 和 DatePicker 的入场动画随浮层实际位置改变方向，避免翻转时先往反方向移动
- 分段控件的选项随主题高度伸展，图标与选中背景保持居中
- 图标按钮、分段选项和表格排序保留可访问名称，移除自动生成的原生悬停提示

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.8.1/codex-proxy-ui-0.8.1.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
