import type {
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeCustomization,
  ThemeMode,
  ThemePreset,
  ThemePresetColorName,
  ThemePresetId,
  ThemeTokenName,
} from '../types'
import { presetPrimaryColors } from '@ant-design/colors'
import en from '../../locale/lang/en'

export const defaultThemeMode: ThemeMode = 'system'
export const defaultThemeColorId: ThemeColorPresetId = 'relay-blue'
export const defaultThemePrimaryColor = '#5983F4'
export const defaultThemeCustomization: ThemeCustomization = {}
export const defaultThemePresetId: ThemePresetId = 'default'

export const themePresets: readonly ThemePreset[] = [
  { id: 'default', colorId: defaultThemeColorId, primaryColor: defaultThemePrimaryColor },
  { id: 'soft', colorId: defaultThemeColorId, primaryColor: defaultThemePrimaryColor },
]

export const DEFAULT_SEED_COLORS = {
  colorSuccess: '#12B981',
  colorWarning: '#F59E0B',
  colorError: '#EF4444',
  colorInfo: defaultThemePrimaryColor,
} as const

export const PRESET_COLOR_SEEDS = {
  blue: presetPrimaryColors.blue,
  cyan: presetPrimaryColors.cyan,
  green: presetPrimaryColors.green,
  orange: presetPrimaryColors.orange,
  purple: presetPrimaryColors.purple,
  red: presetPrimaryColors.red,
} as const satisfies Record<ThemePresetColorName, string>

export const DEFAULT_DIMENSIONS = {
  fontSize: 13,
  sizeUnit: 4,
  sizeStep: 4,
  controlHeight: 38,
  tableRowHeight: 60,
  borderRadius: 8,
  cardBorderRadius: 18,
  shadowStrength: 100,
} as const

export const themeColorPresets: readonly ThemeColorPreset[] = [
  {
    id: 'relay-blue',
    ...en.theme['relay-blue'],
    seed: defaultThemePrimaryColor,
  },
  {
    id: 'deep-teal',
    ...en.theme['deep-teal'],
    seed: '#50605E',
    appearance: {
      light: {
        colorBgBase: '#F8F8F3',
        colorTextBase: '#282D2C',
      },
      dark: {
        colorBgBase: '#202727',
        colorTextBase: '#E4E7DF',
      },
    },
  },
  {
    id: 'signal-violet',
    ...en.theme['signal-violet'],
    seed: '#D395A8',
    appearance: {
      light: {
        colorBgBase: '#FCF6F7',
        colorTextBase: '#3A2E36',
      },
      dark: {
        colorBgBase: '#29242A',
        colorTextBase: '#F1E6E9',
      },
    },
  },
  {
    id: 'graphite',
    ...en.theme.graphite,
    seed: '#A34537',
    appearance: {
      light: {
        colorBgBase: '#FBF5E8',
        colorTextBase: '#3D302A',
      },
      dark: {
        colorBgBase: '#302421',
        colorTextBase: '#F0E3CD',
      },
    },
  },
] as const

/** 完整主题按配色标识索引，配置可直接交给同一编译器或复制为编辑草稿 */
export const themeProfiles: Readonly<Record<ThemeColorPresetId, { preset: ThemePresetId, customization: ThemeCustomization }>> = {
  'relay-blue': { preset: 'default', customization: {} },
  'deep-teal': {
    preset: 'default',
    customization: {
      seed: { colorInfo: '#5F7782', colorSuccess: '#50785C', colorWarning: '#A67A40', controlHeight: 36, borderRadius: 4, shadowStrength: 55 },
      component: { cardBorderRadius: 6, tableRowHeight: 60 },
    },
  },
  'signal-violet': {
    preset: 'default',
    customization: {
      seed: { colorInfo: '#82719A', colorSuccess: '#458365', colorWarning: '#B78032', fontSize: 14, controlHeight: 42, borderRadius: 5 },
      component: { cardBorderRadius: 8, tableRowHeight: 68 },
    },
  },
  'graphite': {
    preset: 'soft',
    customization: {
      seed: { colorInfo: '#466D76', colorSuccess: '#537854', colorWarning: '#BD8C3F', controlHeight: 38, borderRadius: 6, shadowStrength: 80 },
      component: { cardBorderRadius: 12, tableRowHeight: 54 },
    },
  },
}

export const BLACK = '#000000'
export const WHITE = '#FFFFFF'
export const LIGHT_FOREGROUND = WHITE
export const LIGHT_CONTAINER_BASE = WHITE
export const LIGHT_TEXT_BASE = '#0E1726'
export const DARK_CONTAINER_BASE = '#111A29'
export const DARK_TEXT_BASE = '#D8E2EE'

/** 中继蓝浅色主题的稳定中性色阶；带色温主题会连续过渡到通用派生结果。 */
export const LIGHT_SURFACE_ANCHORS = {
  colorBgSpotlight: '#111827',
  colorFillSecondary: '#E9EEF5',
  colorFillTertiary: '#F1F5F9',
  colorFillQuaternary: '#F6F8FB',
  colorBorder: '#D8E0EA',
  colorBorderSecondary: '#E2E8F0',
  colorTextHeading: '#111827',
  colorTextSecondary: '#64748B',
  colorTextMuted: '#94A3B8',
} as const

/** 中继蓝暗色主题的视觉锚点；带色温主题会连续过渡到通用派生结果。 */
export const DARK_SURFACE_ANCHORS = {
  colorBgLayout: '#0B111C',
  colorBgMask: '#030712',
  colorBgSpotlight: '#050913',
} as const

/** 浅色阴影保持中性，不随主题文字色染色。 */
export const LIGHT_SHADOW_BASE = LIGHT_TEXT_BASE

export const EDITABLE_COLOR_TOKEN_NAMES = new Set<ThemeTokenName>([
  'menu-item-selected-bg',
  'input-bg',
  'input-hover-bg',
  'input-active-bg',
  'button-primary-color',
  'button-primary-bg',
  'button-primary-hover-bg',
  'button-primary-active-bg',
  'button-secondary-bg',
  'button-secondary-hover-bg',
  'button-secondary-active-bg',
  'icon-button-secondary-bg',
  'icon-button-secondary-hover-bg',
  'icon-button-secondary-active-bg',
  'card-bg',
  'modal-bg',
  'popover-header-bg',
  'table-header-bg',
  'table-row-bg',
  'table-row-stripe-bg',
  'table-row-hover-bg',
  'table-row-selected-bg',
  'table-row-selected-hover-bg',
  'progress-remaining-color',
  'layout-sider-bg',
  'scrollbar-thumb-bg',
  'scrollbar-thumb-hover-bg',
])

export const EDITABLE_SHADOW_TOKEN_NAMES = new Set<ThemeTokenName>([
  'input-shadow',
  'input-hover-shadow',
  'input-active-shadow',
  'card-shadow',
  'layout-sider-shadow',
])

/** 只有控件填充允许透出宿主背景；容器与固定表格单元格保持实色。 */
export const ALPHA_COLOR_TOKEN_NAMES = new Set<string>([
  'input-bg',
  'input-hover-bg',
  'input-active-bg',
  'button-secondary-bg',
  'button-secondary-hover-bg',
  'button-secondary-active-bg',
  'icon-button-secondary-bg',
  'icon-button-secondary-hover-bg',
  'icon-button-secondary-active-bg',
] satisfies ThemeTokenName[])
