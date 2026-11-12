import type {
  Theme,
  ThemeColorId,
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeCustomization,
  ThemeMap,
  ThemeMode,
  ThemeOptions,
  ThemeScheme,
  ThemeSeedOverrides,
  ThemeSeedTokens,
  ThemeTokens,
} from '../types'
import { pick } from 'es-toolkit'
import { normalizeHexColor } from '../../shared/utils/color'
import {
  deriveLightThemeFillMap,
  deriveThemeAliasMap,
  deriveThemeDataMap,
  deriveThemeLinkMap,
  deriveThemePresetColorMap,
  deriveThemePrimaryMap,
  deriveThemeSemanticMap,
  deriveThemeSurfaceMap,
  ensureThemeSurfaceContrast,
} from '../derive/colors'
import {
  deriveThemeComponentMap,
  deriveThemeDimensionMap,
  deriveThemeShadowMap,
} from '../derive/components'
import {
  DEFAULT_SEED_DIMENSIONS,
  defaultThemeCustomization,
  defaultThemePresetId,
  defaultThemePrimaryColor,
  PRESET_SURFACE_BACKGROUNDS,
  SEED_COLORS_BY_SCHEME,
  THEME_SEED_COLOR_KEYS,
  themeColorPresets,
  themePresets,
  themeProfiles,
} from './constants'
import { normalizeThemeCustomization } from './normalize'
import { createThemeTokens } from './tokens'

export function resolveThemeScheme(mode: ThemeMode, prefersDark: boolean): ThemeScheme {
  if (mode === 'system')
    return prefersDark ? 'dark' : 'light'
  return mode
}

export function resolveThemeSeed(colorId: ThemeColorId, customColor: string): string {
  if (colorId === 'custom')
    return normalizeHexColor(customColor) ?? defaultThemePrimaryColor
  return themeColorPreset(colorId).seed
}

function resolveThemeInputs({
  scheme = 'light',
  preset = defaultThemePresetId,
  colorId,
  primaryColor,
  customization = defaultThemeCustomization,
}: ThemeOptions) {
  const selectedPreset = themePresets.find(item => item.id === preset) ?? themePresets[0]!
  const resolvedColorId = colorId ?? selectedPreset.colorId
  const seed = resolveThemeSeed(resolvedColorId, primaryColor ?? selectedPreset.primaryColor)
  const normalizedCustomization = normalizeThemeCustomization(customization)
  const seedTokens: ThemeSeedTokens = {
    colorPrimary: seed,
    ...SEED_COLORS_BY_SCHEME[scheme],
    ...DEFAULT_SEED_DIMENSIONS,
    ...normalizedCustomization.seed,
  }
  return { scheme, seed, seedTokens, preset: selectedPreset.id, colorId: resolvedColorId, customization: normalizedCustomization }
}

/** 保留预设未指定的颜色；未编辑的默认值继续跟随明暗模式 */
export function resolveThemeProfile(colorId: ThemeColorPresetId, currentSeed: ThemeSeedOverrides = {}) {
  const { preset, customization } = themeProfiles[colorId]
  return {
    preset,
    customization: normalizeThemeCustomization({
      ...customization,
      seed: {
        ...pick(currentSeed, THEME_SEED_COLOR_KEYS),
        ...customization.seed,
      },
    }),
  }
}

export function createThemeSeedTokens(options: ThemeOptions = {}): ThemeSeedTokens {
  return resolveThemeInputs(options).seedTokens
}

export function createTheme(options: ThemeOptions = {}): Theme {
  const { customization, ...theme } = resolveThemeInputs(options)
  const themeMap = deriveThemeMap(theme, customization)
  const tokensWithOverrides: ThemeTokens = {
    ...createThemeTokens(themeMap),
    ...customization.tokenOverrides,
  }

  return {
    ...theme,
    tokens: tokensWithOverrides,
  }
}

export function themeColorPreset(id: ThemeColorPresetId): ThemeColorPreset {
  return themeColorPresets.find(preset => preset.id === id) ?? themeColorPresets[0]!
}

function deriveThemeMap(
  { scheme: name, seed, seedTokens, colorId, preset }: Omit<Theme, 'tokens'>,
  customization: ThemeCustomization,
): ThemeMap {
  // 预设底色只参与表面派生，显式设置的背景优先，编辑器与持久化的 Seed 保持不变
  const background = customization.seed?.colorBgBase ?? PRESET_SURFACE_BACKGROUNDS[colorId]?.[name] ?? seedTokens.colorBgBase
  const fills = name === 'light' ? deriveLightThemeFillMap(background, seedTokens.colorTextBase) : null
  const baseSurfaces = deriveThemeSurfaceMap(name, background, seedTokens.colorTextBase)
  const primary = deriveThemePrimaryMap(seed, name, baseSurfaces.colorBgContainer)
  const surfaces = ensureThemeSurfaceContrast(baseSurfaces, fills, primary)
  const aliases = deriveThemeAliasMap(surfaces)
  const link = deriveThemeLinkMap(seedTokens.colorLink, name, surfaces.colorBgContainer)
  const semantics = deriveThemeSemanticMap(name, surfaces, seedTokens, fills, primary)

  return {
    surfaces,
    aliases,
    primary,
    link,
    semantics,
    presetColors: deriveThemePresetColorMap(name, surfaces.colorBgContainer, seedTokens),
    data: deriveThemeDataMap(aliases, semantics),
    shadows: deriveThemeShadowMap(name, seedTokens.shadowStrength),
    components: deriveThemeComponentMap(
      surfaces,
      fills,
      primary,
      semantics.error,
      seedTokens.shadowStrength,
      preset,
    ),
    dimensions: deriveThemeDimensionMap(seedTokens, customization.component),
  }
}
