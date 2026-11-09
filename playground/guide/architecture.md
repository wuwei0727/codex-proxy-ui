# 组件架构与目录

实现文件与库内引用使用不带前缀的实体名，公开入口使用 `Z` 前缀：`button/Button.vue` → `ZButton` → `@codex-proxy/ui/button`。模板可使用 PascalCase（`ZButton`）或 kebab-case（`z-button`）标签，示例采用 PascalCase

## 目录归属

```text
src/
├── index.ts                       # 公开根入口
├── components/
│   ├── button/
│   │   ├── index.ts               # 按需导出
│   │   ├── types.ts               # 公开合同
│   │   ├── Button.vue             # 实现
│   │   └── utils/surface.ts       # 按钮表面样式
│   ├── select/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── Select.vue
│   │   ├── components/SelectTags.vue
│   │   └── composables/           # 状态与浮层定位
│   ├── form/                      # Form、FormItem 与字段上下文
│   ├── table/                     # Table 与列设置
│   ├── pagination/                # 独立分页合同
│   ├── sidebar/                   # 侧栏容器、折叠展示与两级导航
│   ├── loading/                   # 加载指令、值类型与蒙层生命周期
│   └── notification/              # 命令式服务、内部列表与通知生命周期
├── shared/
│   ├── types.ts                   # ComponentSize
│   └── utils/                     # 已有跨组件纯工具
├── theme/                         # 主题算法与运行时
├── locale/                        # 语言包、全局配置与组件文案
├── styles/                        # 全局基线、令牌、Tailwind 入口
├── build/                         # Node 构建工具与主题前缀转换
└── vite.ts                        # Vite 接入与源码联调

playground/
├── components/                    # 按实体组织的 API 文档
├── examples/                      # 对应交互示例
├── guide/                         # 接入、架构、主题与联调
└── .vitepress/                    # 文档站点配置和主题
```

`index.ts` 只组织公开导出。关联组件由同一实体入口提供，例如 FormItem 属于 form，TableColumnSettings 属于 table。分页有自己的入口

浏览器入口不依赖 `build/` 或 Node API，Vite 适配器由独立的 `/vite` 入口提供。公开组件、主题与语言包入口及命名见[公开 API](./api.md)

```ts
// button/index.ts
export { default as ZButton } from './Button.vue'
// notification/index.ts
export { notification as ZNotification } from './service'
```

公开前缀集中在各实体的 `index.ts`，库内导入使用 `Button`、`Dialog` 等实现名称。更换公开前缀需要同步入口、消费方和 API 文档，内部文件与引用无需改名

私有 Vue 子组件放在所属目录的 components/，响应式状态放在 composables/，纯计算和 DOM 工具放在 utils/，拆出的样式放在 styles/。按实际需要建立辅助目录，小组件保留入口、类型与 SFC，不建立空目录或转发层

组件属性、事件、插槽和实例以实际声明为准。独立合同放在 types.ts 并由组件使用，简单合同从 SFC 派生，避免维护第二份属性定义。跨组件尺寸使用 ComponentSize；表格列宽预设属于列合同

只有已存在跨组件调用的能力进入 shared/。字段上下文由 form 拥有，通知状态与计时器由 notification 拥有。消费方通过公开入口导入，库内直接引用所属实现，避免根入口循环依赖

DOM 指令由对应实体拥有，例如 loading/ 的 directive.ts 与 types.ts。入口导出 `vLoading`，供 `<script setup>` 局部使用或注册为全局 `v-loading`；应用只负责注册，蒙层和 DOM 状态的清理由组件库负责

文档站通过 VitePress 默认主题的插槽和样式扩展组织导航与阅读布局。`DemoExample` 将示例与可折叠的用法代码放在一起，`DemoPlayground` 管理预览和配置区；文档排版避开 `vp-raw` 示例区域，组件示例使用库内真实实现

`DocsSidebar` 在 VitePress 原侧栏外组合 `ZScrollbar`，菜单和移动端控制仍由默认主题持有。页面滚动条使用 `ZScrollbar` 的文档目标模式，保持原生页面滚动源

## 合同与职责

- 属性使用 camelCase，模板使用 kebab-case；事件声明遵循 Vue 的 camelCase，模板监听使用 kebab-case
- 值使用默认或具名 v-model；用户事件表达意图，程序更新不伪造用户操作
- label 表示可见文本，隐藏名称使用 aria-label，可访问名称不自动生成 title 提示；原生属性传给实际控件，class/style 放在文档约定的根节点
- 按钮分别用 type、variant、native-type 表达语义、外观、原生行为
- 表单执行调用方规则；数据请求、业务草稿和保存生命周期由应用拥有
- 表格不排序业务数据，分页不请求数据，远程选择器只通知查询词，通知容器不公开可变消息列表
