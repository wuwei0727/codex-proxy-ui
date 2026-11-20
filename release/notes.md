# v0.13.0

## 组件

- `ZSelect` 的远程搜索支持通过 `debounce` 设置防抖时间。监听 `end-reached` 可在滚动到底部时追加选项，保留滚动位置和当前键盘选项
- `ZSelect` 通过 `popup-scroll` 提供下拉列表的滚动坐标。`ZScrollbar` 通过 `end-reached` 通知到达的边界方向
- `ZTable` 统一绘制固定表头背景，消除部分显示缩放比例下列与列之间的浅色接缝

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.13.0/codex-proxy-ui-0.13.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
