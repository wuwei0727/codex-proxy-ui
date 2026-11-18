# v0.12.0

## 组件

- 新增 `ZDropdown` 操作菜单，支持键盘打开、方向键导航、选中后收起和 Esc 返回触发按钮
- `ZIconButton` 区分普通按钮和未按下的切换按钮，让读屏软件正确识别状态
- 配置 Provider、表单或表单项的尺寸后，子控件可继承尺寸，也可单独覆盖
- 表单控件支持关闭事件校验，改为提交时集中校验
- 选择器支持限制多选数量、自定义无匹配和加载文案；表格支持关闭斑马纹和指定行样式

## Playground

- 图标按钮示例和 API 并入 Button 页，菜单项页面新增 Dropdown 示例

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.12.0/codex-proxy-ui-0.12.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
