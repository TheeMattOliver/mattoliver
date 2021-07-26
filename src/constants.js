export const COLORS = {
  text: {
    light: 'hsl(0deg, 0%, 10%)', // white
    dark: 'hsl(0deg, 0%, 100%)', // near-black
  },
  background: {
    light: 'hsl(0deg, 0%, 100%)', // white
    dark: 'hsl(200deg, 20%, 9%)', // black
  },
  footerBackground: {
    light: 'hsl(200deg, 20%, 9%)', // navy navy blue
    dark: 'hsl(240deg, 1%, 72%)', // medium-gray #7b7b7b
  },
  footerText: {
    light: 'hsl(0deg, 0%, 100%)', // near-black
    dark: 'hsl(200deg, 20%, 9%)', // near-black    
  },
  dropdownPanelBackground: {
    light: 'hsl(0deg, 0%, 100%)',
    dark: 'hsl(212deg, 8%, 24%)' // near-black
  },
  primary: {
    light: 'hsl(0deg, 0%, 0%)', // white
    dark: 'hsl(50deg, 100%, 50%)', // yellow
  },
  secondary: {
    light: 'hsl(250deg, 100%, 50%)', // Purplish-blue
    dark: 'hsl(190deg, 100%, 40%)', // Cyan
  },
  langPrimary: {
    light: 'hsl(0deg, 0%, 0%)', // white
    dark: 'hsl(212deg, 18%, 81%)', // light-gray-blue
  },
  langSecondary: {
    light: 'hsl(0deg, 0%, 50%)',
    dark: 'hsl(0deg, 0%, 50%)',
  },
  // Grays, scaling from least-noticeable to most-noticeable
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
    dark: 'hsl(210deg, 38%, 95%)' // text-color200
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
