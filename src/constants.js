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
  panelBackgroundDark: {
    light: 'hsl(210deg, 13%, 12%)', // charcoal #1B1F23
    dark: 'hsl(0deg, 0%, 4%)', // near-black #0A0A0A
  },
  borderPrimary: {
    light: 'hsl(214deg, 13%, 90%)', // grey #E1E4E8
    dark: 'hsl(212deg, 12%, 21%)', // charcoal-black #30363D
  },
  buttonPrimary: {
    light: 'hsl(212deg, 97%, 43%)', // #0366D6
    dark: 'hsl(212deg, 100%, 67%)', // #58A6FF
  },
  // White
  white: {
    light: 'hsl(0deg, 0%, 96%)', // #F2F2F2
    dark: 'hsl(0deg, 0%, 95%)', // #F2F2F2
  },
  // Black
  black: {
    light: 'hsl(0deg, 0%, 0%)', // #000000
    dark: 'hsl(0deg, 0%, 0%)', // #000000
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
  // Blues, scaling from least-noticeable to darkest navy
  blue50: {
    light: 'hsl(212deg, 98%, 93%)', // #DCECFF
    dark: 'hsl(212deg, 100%, 95%)', // #E5F1FF
  },
  blue100: {
    light: 'hsl(212deg, 97%, 83%)', // #A9D1FE
    dark: 'hsl(212deg, 100%, 92%)', // #D6E9FF
  },
  blue300: {
    light: 'hsl(212deg, 97%, 63%)', // #459BFC
    dark: 'hsl(212deg, 100%, 83%)', // #A8D1FF
  },
  blue500: {
    light: 'hsl(212deg, 97%, 43%)', // #0366D6
    dark: 'hsl(212deg, 100%, 67%)', // #58A6FF
  },
  blue700: {
    light: 'hsl(212deg, 97%, 33%)', // #024FA6
    dark: 'hsl(212deg, 100%, 47%)', // #0070F0
  },
  blue900: {
    light: 'hsl(212deg, 97%, 25%)', // #023B7D
    dark: 'hsl(212deg, 100%, 31%)' // #004A9E
  },
  blue1000: {
    light: 'hsl(212deg, 97%, 16%)', // #012750
    dark: 'hsl(212deg, 100%, 24%)' // #00397A
  },
};


// export const BREAKPOINTS = {
//   phone: 600,
//   tablet: 950,
//   laptop: 1300,
// };

// Mobile first
export const BREAKPOINTS = {
  phoneMin: 450,
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const WEIGHTS = {
  light: 300,
  thin: 400,
  normal: 500,
  medium: 600,
  bold: 800,
};


// default size is for large screens, so use max-width bc we want things to apply if it 
// is this size or smaller 
// export const QUERIES = {
//   phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
//   tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
//   laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
// };

// mobile first
export const QUERIES = {
  phoneMinAndUp: `(min-width: ${BREAKPOINTS.phoneMin / 16}rem})`,
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  tabletOnly: `
    (min-width: ${BREAKPOINTS.tabletMin / 16}rem) and
    (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
};

export const COLOR_MODE_KEY = 'color-mode';
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';
