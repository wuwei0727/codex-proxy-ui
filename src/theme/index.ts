import type { ThemeTokenName } from './types'
import { createTheme } from './core/resolve'

/** 由主题编译器实际输出生成的语义 Token 名，独立于各页面的 CSS 前缀 */
export const themeTokenNames = Object.freeze(
  Object.keys(
    createTheme().tokens,
  ) as ThemeTokenName[],
)

export {
  defaultThemeColorId,
  defaultThemeMode,
  defaultThemePresetId,
  defaultThemePrimaryColor,
  themeColorPresets,
  themePresets,
  themeProfiles,
} from './core/constants'
export {
  isThemeColorId,
  isThemeMode,
  isThemePresetId,
  normalizeThemeCustomization,
  supportsThemeTokenAlpha,
} from './core/normalize'
export {
  createTheme,
  createThemeSeedTokens,
  resolveThemeProfile,
  resolveThemeScheme,
} from './core/resolve'
export { createThemeVars, getThemeVarName, themePrefix } from './namespace'
export { applyTheme } from './runtime/browser'
export type {
  Theme,
  ThemeColorId,
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeComponentOverrides,
  ThemeCustomization,
  ThemeMode,
  ThemeOptions,
  ThemePreset,
  ThemePresetId,
  ThemeScheme,
  ThemeSeedColors,
  ThemeSeedDimensions,
  ThemeSeedOverrides,
  ThemeSeedTokens,
  ThemeTokenName,
  ThemeTokens,
} from './types'
