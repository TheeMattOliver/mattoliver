export const COLORS = {
  textPrimary: {
    light: 'hsl(210deg, 12%, 16%)', // dark grey #24292E
    dark: 'hsl(210deg, 17%, 82%)', // light grey #C9D1D9
  },
  textSecondary: {
    light: 'hsl(212deg, 9%, 38%)', // gry #586069
    dark: 'hsl(212deg, 9%, 58%)' // light grey #8B949E
  },
  textTertiary: {
    light: 'hsl(212deg, 8%, 45%)', // grey #6A737D
    dark: 'hsl(212deg, 9%, 58%)', // light grey #C9D1D9
  },
  textLink: {
    light: 'hsl(212deg, 97%, 43%)', // blue #0366D6
    dark: 'hsl(212deg, 100%, 67%)', // light blue #58A6FF
  },
  background: {
    light: 'hsl(0deg, 0%, 100%)', // white
    dark: 'hsl(216deg, 28%, 7%)', // near-black #0D1117
  },
  panelBackground: {
    light: 'hsl(0deg, 0%, 100%)', // white
    dark: 'hsl(210deg, 12%, 16%)' // charcoal-black #24292E
  },
  // Grays, scaling from least-noticeable to most-noticeable
  gray50: {
    light: 'hsl(0deg, 0%, 96%)',
    dark: 'hsl(0deg, 0%, 30%)',
  },
  gray100: {
    light: 'hsl(0deg, 0%, 90%)',
    dark: 'hsl(0deg, 0%, 30%)',
  },
  gray300: {
    light: 'hsl(0deg, 0%, 70%)',
    dark: 'hsl(0deg, 0%, 30%)',
  },
  gray500: {
    light: 'hsl(0deg, 0%, 50%)',
    dark: 'hsl(0deg, 0%, 50%)',
  },
  gray700: {
    light: 'hsl(0deg, 0%, 30%)',
    dark: 'hsl(0deg, 0%, 70%)',
  },
  gray900: {
    light: 'hsl(0deg, 0%, 10%)',
    dark: 'hsl(210deg, 38%, 95%)'
  },
};

// For this site, we'll going desktop-first.
export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
};

// default size is for large screens, so use max-width bc we want things to apply if it 
// is this size or smaller 
export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
};

export const COLOR_MODE_KEY = 'color-mode';
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';
