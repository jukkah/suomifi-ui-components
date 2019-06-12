import { lighten } from 'polished';
import { alphaHex } from '../../utils/css/colors';
import { boxshadowOutline } from './utils/outline';
import { zindexes } from './zindexes';

export type IColors = typeof colors;

export const colorTokens = {
  base: {
    whiteBase: '#FFFFFF',
    blackBase: '#282828',
  },
  brand: {
    brandBase: '#00357A',
  },
  depth: {
    depthDark27: '#5F686D',
    depthBase: '#A5ACB1',
    depthLight30: '#F7F7F8',
    depthLight26: '#ECEDEE',
    depthLight13: '#C8CDD0',
  },
  depthSecondary: {
    depthSecondaryDark3: '#E0EDFF',
    depthSecondary: '#F0F6FF',
  },
  hightlight: {
    highlightDark9: '#235A9A',
    highlightBase: '#2A6EBB',
    highlightLight4: '#2E78CC',
    highlightLight45: '#D5E4F6',
    highlightLight50: '#EAF2FA',
    highlightLight53: '#F7FAFD',
  },
  accent: {
    accentBase: '#E97025',
    accentSecondary: '#34B5E5',
    accentSecondaryLight40: '#E8F7FC',
    accentTertiaryDark9: 'hsla(284, 36%, 45%, 1)',
    accentTertiary: 'hsla(284, 36%, 54%, 1)',
  },
  trafficlights: {
    successBase: '#09AE88',
    warningBase: '#FAAF00',
    warningLight47: '#FAEBEB',
    alertBase: '#C33932',
  },
};

export const colors = {
  ...colorTokens.base,
  ...colorTokens.brand,
  ...colorTokens.depth,
  ...colorTokens.depthSecondary,
  ...colorTokens.hightlight,
  ...colorTokens.accent,
  ...colorTokens.trafficlights,
};

export type IShadows = typeof shadows;

export const shadows = {
  invertTextShadow: `0 1px 1px ${colors.brandBase}`,
  menuShadow: `0 2px 3px 0 ${alphaHex(0.2)(colors.blackBase)}`,
  panelShadow: `0 1px 2px 0 ${alphaHex(0.14)(
    colors.blackBase,
  )}, 0 1px 5px 0 ${alphaHex(0.12)(colors.blackBase)}`,
};

export type IGradients = typeof gradients;

export const gradients = {
  highlightBase: `linear-gradient(0deg, ${colors.highlightBase} 0%, ${lighten(
    0.1,
    colors.highlightBase,
  )} 100%)`,
  highlightLight4: `linear-gradient(0deg, ${
    colors.highlightLight4
  } 0%, ${lighten(0.1, colors.highlightLight4)} 100%)`,
  highlightDark9: `linear-gradient(0deg, ${colors.highlightDark9} 0%, ${lighten(
    0.1,
    colors.highlightDark9,
  )} 100%)`,
  depthBase: `linear-gradient(0deg, ${colors.depthBase} 0%, ${lighten(
    0.1,
    colors.depthBase,
  )} 100%)`,
  whiteBaseNegative: `linear-gradient(-180deg, ${alphaHex(0.1)(
    colors.whiteBase,
  )} 0%, ${alphaHex(0)(colors.whiteBase)} 100%)`,
  depthLight26: `linear-gradient(0deg, ${colors.depthLight26} 0%, ${
    colors.whiteBase
  } 100%)`,
};

export const outlines = {
  basic: boxshadowOutline({
    color: colors.accentBase,
    offset: '4px',
    zIndex: zindexes.focus,
  }),
};
