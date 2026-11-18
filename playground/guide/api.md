# 公开 API

组件、服务、组合式函数和工具使用命名导出，按功能提供子路径；Vite 构建插件使用默认导出

## 组件尺寸

`ZConfigProvider` 的 `size` 接受 `small`、`default` 或 `large`。按钮、标签、表单控件、分段选择、表格和分页跟随配置，尺寸变化不会修改绑定值

优先级为控件自身、最近的表单项或表单、最近配置了尺寸的 Provider。显式传 `default` 也会覆盖继承值。均未配置时，分页保持 `small`，其他控件使用 `default`。表格列宽、弹窗宽度和每页条数仍由各自属性决定。参见[交互示例](../components/form.md#sizes)

## 入口

| 导入路径                       | 公开能力                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `@codex-proxy/ui`              | `Z*` 组件、通知服务、组合式函数、表格定义与颜色校验工具           |
| `@codex-proxy/ui/<component>`  | 对应组件、公开方法及类型，例如 `@codex-proxy/ui/form`             |
| `@codex-proxy/ui/theme`        | 主题创建、应用、配置校验、CSS 变量与主题类型，详见[主题](./theme) |
| `@codex-proxy/ui/locale`       | `en`、`zhHans`、`zhHant` 语言包及 `UiLocale` 类型                 |
| `@codex-proxy/ui/vite`         | `CodexProxyUI(options?)` 构建插件及 `CodexProxyUIOptions`         |
| `@codex-proxy/ui/styles.css`   | 完整组件样式与公共动画                                            |
| `@codex-proxy/ui/tailwind.css` | 消费方 Tailwind 构建使用的语义 utility 定义                       |

## 可复用方法

| 方法                               | 用途与子路径                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| `ZNotification(options)`           | 默认通知服务；`notification`                                                     |
| `createNotification(config?)`      | 创建独立通知服务，支持响应式语言配置，返回 `NotificationService`；`notification` |
| `useModalFocus(panel, options)`    | 管理自定义模态面板的焦点、Tab 循环及 Escape；`dialog`                            |
| `useTableColumns(source, tableId)` | 管理表格列显隐、排序和持久化偏好；`table`                                        |
| `defineTableColumns(columns)`      | 保留行类型约束的列定义；`table`                                                  |
| `normalizeHexColor(value)`         | 校验六位 HEX，返回规范化颜色或 `null`；`color-picker`                            |
| `normalizeRgbaHexColor(value)`     | 校验八位 RGBA HEX，返回规范化颜色或 `null`；`color-picker`                       |
| `vLoading`                         | Vue 加载状态指令；`loading`                                                      |

组件实例方法以对应文档的 Exposes 与 `*Instance` 类型为准；通知服务配置、调用参数和返回句柄分别使用 `NotificationConfig`、`NotificationOptions`、`NotificationHandle`

## 命名与边界

- 组件和默认命令式服务使用 `Z` 前缀，普通方法使用小驼峰
- `create` 创建值或服务，`apply` 应用副作用，`get` 读取名称，`resolve` 解析配置，`normalize` 规范化输入，`is` 与 `supports` 表达判断
- `use` 用于 Vue 组合式函数；主题纯计算方法不依赖组件生命周期
- 默认配置与预置集合使用 `defaultThemeMode`、`themeColorPresets` 等小驼峰名，类型使用大驼峰
- 公开入口只包含可独立消费的能力；分页计算、表格布局、Markdown 渲染和颜色派生步骤由组件内部负责

组件与服务名可通过导入别名使用；主题 CSS 变量前缀通过构建配置 `themePrefix` 独立设置
