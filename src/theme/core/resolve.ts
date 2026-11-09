import type {
  Theme,
  ThemeAppearanceSeed,
  ThemeColorId,
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeCustomization,
  ThemeMap,
  ThemeMode,
  ThemeOptions,
  ThemePresetId,
  ThemeScheme,
  ThemeSeedOverrides,
  ThemeSeedTokens,
  ThemeTokens,
} from '../types'
import { normalizeHexColor } from '../../shared/utils/color'
import { deriveCustomThemeAppearance } from '../derive/appearance'
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
  DARK_CONTAINER_BASE,
  DARK_TEXT_BASE,
  DEFAULT_DIMENSIONS,
  DEFAULT_SEED_COLORS,
  defaultThemeCustomization,
  defaultThemePresetId,
  defaultThemePrimaryColor,
  LIGHT_CONTAINER_BASE,
  LIGHT_TEXT_BASE,
  themeColorPresets,
  themePresets,
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
  const appearance = resolvedColorId === 'custom'
    ? deriveCustomThemeAppearance(scheme, seed)
    : themeColorPreset(resolvedColorId).appearance?.[scheme]
  const seedTokens = resolveThemeSeedTokens(
    scheme,
    seed,
    normalizedCustomization.seed,
    appearance,
  )
  return { scheme, seed, seedTokens, preset: selectedPreset.id, colorId: resolvedColorId, customization: normalizedCustomization }
}

export function createThemeSeedTokens(options: ThemeOptions = {}): ThemeSeedTokens {
  return resolveThemeInputs(options).seedTokens
}

export function createTheme(options: ThemeOptions = {}): Theme {
  const { customization, ...theme } = resolveThemeInputs(options)
  const themeMap = deriveThemeMap(theme.scheme, theme.seed, theme.seedTokens, customization, theme.preset)
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
  name: ThemeScheme,
  seed: string,
  seedTokens: ThemeSeedTokens,
  customization: ThemeCustomization,
  preset: ThemePresetId,
): ThemeMap {
  const fills = name === 'light' ? deriveLightThemeFillMap(seedTokens) : null
  const baseSurfaces = deriveThemeSurfaceMap(name, seedTokens)
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

export function resolveThemeSeedTokens(
  theme: ThemeScheme,
  colorPrimary: string,
  overrides?: ThemeSeedOverrides,
  appearance?: ThemeAppearanceSeed,
): ThemeSeedTokens {
  return {
    colorPrimary,
    colorSuccess: overrides?.colorSuccess ?? DEFAULT_SEED_COLORS.colorSuccess,
    colorWarning: overrides?.colorWarning ?? DEFAULT_SEED_COLORS.colorWarning,
    colorError: overrides?.colorError ?? DEFAULT_SEED_COLORS.colorError,
    colorInfo: overrides?.colorInfo ?? DEFAULT_SEED_COLORS.colorInfo,
    colorLink: overrides?.colorLink ?? colorPrimary,
    colorTextBase: overrides?.colorTextBase
      ?? appearance?.colorTextBase
      ?? (theme === 'dark' ? DARK_TEXT_BASE : LIGHT_TEXT_BASE),
    colorBgBase: overrides?.colorBgBase
      ?? appearance?.colorBgBase
      ?? (theme === 'dark' ? DARK_CONTAINER_BASE : LIGHT_CONTAINER_BASE),
    fontSize: overrides?.fontSize ?? DEFAULT_DIMENSIONS.fontSize,
    sizeUnit: overrides?.sizeUnit ?? DEFAULT_DIMENSIONS.sizeUnit,
    sizeStep: overrides?.sizeStep ?? DEFAULT_DIMENSIONS.sizeStep,
    controlHeight: overrides?.controlHeight ?? DEFAULT_DIMENSIONS.controlHeight,
    borderRadius: overrides?.borderRadius ?? DEFAULT_DIMENSIONS.borderRadius,
    shadowStrength: overrides?.shadowStrength ?? DEFAULT_DIMENSIONS.shadowStrength,
  }
}
