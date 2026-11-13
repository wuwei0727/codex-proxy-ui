import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/postcss'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import CodexProxyUI from '../../src/vite'

export default defineConfig({
  title: 'Codex Proxy UI',
  description: '为插件与管理工具构建一致的界面',
  lang: 'zh-CN',
  cleanUrls: true,
  // 图标与导航复用同一 SVG，内联后不受部署子路径和 404 页面地址影响。
  head: [['link', {
    rel: 'icon',
    type: 'image/svg+xml',
    href: `data:image/svg+xml;base64,${readFileSync(new URL('../public/logo.svg', import.meta.url), 'base64')}`,
  }]],
  themeConfig: {
    siteTitle: false,
    logo: { src: '/logo.svg', alt: '' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/zyycn/codex-proxy-ui', ariaLabel: 'UI 源码仓库' }],
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
      { text: '主仓库', link: 'https://github.com/zyycn/codex-proxy-rs' },
    ],
    sidebar: {
      '/components/': [
        { text: '组件总览', link: '/components/' },
        { text: '基础', collapsed: false, items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'IconButton 图标按钮', link: '/components/icon-button' },
          { text: 'Tag 标签', link: '/components/tag' },
          { text: 'MotionIcon 动效图标', link: '/components/motion-icon' },
        ] },
        { text: '布局与导航', collapsed: false, items: [
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'PageHeader 页头', link: '/components/page-header' },
          { text: 'Sidebar 侧边栏', link: '/components/sidebar' },
          { text: 'Segmented 分段选择', link: '/components/segmented' },
          { text: 'MenuItem 菜单项', link: '/components/menu-item' },
          { text: 'Scrollbar 滚动容器', link: '/components/scrollbar' },
        ] },
        { text: '表单', collapsed: false, items: [
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'InputTag 标签输入', link: '/components/input-tag' },
          { text: 'InputNumber 数字输入', link: '/components/input-number' },
          { text: 'Textarea 文本域', link: '/components/textarea' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
          { text: 'Checkbox 复选框', link: '/components/checkbox' },
          { text: 'Radio 单选框', link: '/components/radio' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
          { text: 'Slider 滑块', link: '/components/slider' },
        ] },
        { text: '数据展示', collapsed: false, items: [
          { text: 'Table 表格', link: '/components/table', items: [

            { text: '列设置', link: '/components/table#columns' },
          ] },
          { text: 'Pagination 分页', link: '/components/pagination' },
          { text: 'Markdown 内容', link: '/components/markdown' },
        ] },
        { text: '反馈与浮层', collapsed: false, items: [
          { text: 'Dialog 弹窗', link: '/components/dialog' },
          { text: 'ConfirmDialog 确认弹窗', link: '/components/confirm-dialog' },
          { text: 'Popover 气泡', link: '/components/popover' },
          { text: 'Notification 消息提示', link: '/components/notification' },
          { text: 'Loading 加载', link: '/components/loading' },
          { text: 'Empty 空状态', link: '/components/empty' },
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
        ] },
      ],
      '/': [{ text: '开始使用', items: [
        { text: '概览', link: '/' },
        { text: '安装与按需使用', link: '/guide/installation' },
        { text: '公开 API', link: '/guide/api' },
        { text: '源码联调与热更新', link: '/guide/development' },
        { text: '组件架构与目录', link: '/guide/architecture' },
        { text: '国际化', link: '/guide/i18n' },
        { text: '主题', link: '/guide/theme' },
        { text: '组件总览', link: '/components/' },
      ] }],
    },
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    sidebarMenuLabel: '组件目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '主题',
    search: { provider: 'local' },
  },
  vite: {
    resolve: {
      alias: [{
        // 只替换默认 Layout 的相对引用，包装组件仍可导入原始侧栏。
        find: /^\.\/components\/VPSidebar\.vue$/u,
        replacement: fileURLToPath(new URL('./theme/DocsSidebar.vue', import.meta.url)),
      }, {
        find: '#vitepress-sidebar',
        replacement: fileURLToPath(import.meta.resolve('vitepress/dist/client/theme-default/components/VPSidebar.vue')),
      }],
    },
    // VitePress 稳定版与库构建使用不同主版本的 Vite，使用官方 PostCSS 集成避免耦合插件类型。
    css: { postcss: { plugins: [
      tailwindcss(),
      postcssIsolateStyles({
        includeFiles: [/vitepress\/dist\/client\/theme-default\/styles\/(?:base|components\/vp-doc)\.css/u],
        // 浮层被 Teleport 到 body，仍需避开文档基线，而不是给示例组件加覆盖样式。
        prefix: ':not(:where(.vp-raw, .vp-raw *, [data-z-overlay], [data-z-overlay] *, [role="presentation"], [role="presentation"] *, [role="status"], [role="status"] *, [role="alert"], [role="alert"] *))',
      }),
    ] } },
    server: { watch: { ignored: ['**/.vitepress/dist/**'] } },
    plugins: [CodexProxyUI({ source: new URL('../../', import.meta.url) })],
  },
})
