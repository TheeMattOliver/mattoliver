export const COLORS = {
  textPrimary: {
    light: "hsl(210deg, 12%, 16%)", // dark grey #24292E
    dark: "hsl(210deg, 17%, 82%)", // light grey #C9D1D9
  },
  textWhite: {
    light: "hsl(0deg, 0%, 96%)", // white
    dark: "hsl(0deg, 0%, 0%)", // black
  },
  textBlack: {
    light: "hsl(0deg, 0%, 0%)", // black
    dark: "hsl(100, 100%, 100%)", // white
  },
  textSecondary: {
    light: "hsl(212deg, 9%, 38%)", // gry #586069
    dark: "hsl(212deg, 9%, 58%)", // light grey #8B949E
  },
  textTertiary: {
    light: "hsl(212deg, 8%, 45%)", // grey #6A737D
    dark: "hsl(212deg, 9%, 58%)", // light grey #C9D1D9
  },
  textLink: {
    light: "hsl(212deg, 97%, 43%)", // blue #0366D6
    dark: "hsl(212deg, 100%, 67%)", // light blue #58A6FF
  },
  background: {
    light: "hsl(0deg, 0%, 100%)", // white
    dark: "hsl(216deg, 28%, 7%)", // near-black #0D1117
  },
  backgroundOverlay: {
    light: "hsl(0deg, 0%, 100%)", // white
    dark: "hsl(210deg, 12%, 16%)", // charcoal-black #24292E
  },
  backgroundOverlayDark: {
    light: "hsl(210deg, 13%, 12%)", // charcoal #1B1F23
    dark: "hsl(0deg, 0%, 4%)", // near-black #0A0A0A
  },
  borderPrimary: {
    light: "hsl(214deg, 13%, 90%)", // grey #E1E4E8
    dark: "hsl(212deg, 12%, 21%)", // charcoal-black #30363D
  },
  buttonPrimary: {
    light: "hsl(212deg, 97%, 43%)", // #0366D6
    dark: "hsl(212deg, 100%, 67%)", // #58A6FF
  },
  hiddenBackgroundOverlay: {
    light: "hsl(214deg, 13%, 90%)", // grey #E1E4E8
    dark: "hsl(212deg, 12%, 21%)", // charcoal-black #30363D
  },
  // White
  white: {
    light: "hsl(0deg, 0%, 100%)", // #FFFFFF
    dark: "hsl(0deg, 0%, 100%)", // #FFFFFF
  },
  // Black
  black: {
    light: "hsl(0deg, 0%, 0%)", // #000000
    dark: "hsl(0deg, 0%, 0%)", // #000000
  },
  // Grays, scaling from least-noticeable to most-noticeable
  gray50: {
    light: "hsl(0deg, 0%, 96%)",
    dark: "hsl(0deg, 0%, 5%)",
  },
  gray100: {
    light: "hsl(0deg, 0%, 90%)",
    dark: "hsl(0deg, 0%, 10%)",
  },
  gray200: {
    light: "hsl(0deg, 0%, 80%)",
    dark: "hsl(0deg, 0%, 20%)",
  },
  gray300: {
    light: "hsl(0deg, 0%, 70%)",
    dark: "hsl(0deg, 0%, 30%)",
  },
  gray500: {
    light: "hsl(0deg, 0%, 50%)",
    dark: "hsl(0deg, 0%, 50%)",
  },
  gray600: {
    light: "hsl(0deg, 0%, 40%)",
    dark: "hsl(0deg, 0%, 60%)",
  },
  gray700: {
    light: "hsl(0deg, 0%, 30%)",
    dark: "hsl(0deg, 0%, 70%)",
  },
  gray800: {
    light: "hsl(0deg, 0%, 20%)",
    dark: "hsl(0deg, 0%, 80%)",
  },
  gray900: {
    light: "hsl(0deg, 0%, 10%)",
    dark: "hsl(210deg, 38%, 95%)",
  },
  // Blues, scaling from least-noticeable to darkest navy
  blue50: {
    light: "hsl(212deg, 98%, 93%)", // #DCECFF
    dark: "hsl(212deg, 100%, 95%)", // #E5F1FF
  },
  blue100: {
    light: "hsl(212deg, 97%, 83%)", // #A9D1FE
    dark: "hsl(212deg, 100%, 92%)", // #D6E9FF
  },
  blue300: {
    light: "hsl(212deg, 97%, 63%)", // #459BFC
    dark: "hsl(212deg, 100%, 83%)", // #A8D1FF
  },
  blue500: {
    light: "hsl(212deg, 97%, 43%)", // #0366D6
    dark: "hsl(212deg, 100%, 67%)", // #58A6FF
  },
  blue700: {
    light: "hsl(212deg, 97%, 33%)", // #024FA6
    dark: "hsl(212deg, 100%, 47%)", // #0070F0
  },
  blue900: {
    light: "hsl(212deg, 97%, 25%)", // #023B7D
    dark: "hsl(212deg, 100%, 31%)", // #004A9E
  },
}

export const FONT_SIZES = [
  "14px", // h6
  "16px", // h5
  "18px", // h4
  "24px", // h3
  "36px", // h2
  "48px", // h1
  "72px", // h0
  "96px", // h00
]
export const LINE_HEIGHTS = {
  condensedUltra: 1,
  condensed: 1.25,
  default: 1.5,
  relaxed: 1.75,
}

export const FONT_WEIGHTS = {
  light: 300,
  normal: 500,
  semibold: 600,
  bold: 700,
  ultrabold: 800,
}

// Mobile first
export const BREAKPOINTS = {
  xxs: 320,
  xs: 450,
  sm: 544,
  md: 768,
  lg: 1024,
  laptopMin: 1100,
  xl: 1440,
  desktopMin: 1500,
  ultraWideMin: 1918,
  ultraSuperWide: 2400,
  ridiculous: 4000,
}

// mobile first
export const QUERIES = {
  xxsAndUp: `(min-width: ${BREAKPOINTS.xxs / 16}rem})`, // (min-width: 320px)
  xsAndUp: `(min-width: ${BREAKPOINTS.xs / 16}rem})`, // (min-width: 450px)
  smAndUp: `(min-width: ${BREAKPOINTS.sm / 16}rem)`, // (min-width: 544px)
  mdAndUp: `(min-width: ${BREAKPOINTS.md / 16}rem)`, // (min-width: 768px)
  lgAndUp: `(min-width: ${BREAKPOINTS.lg / 16}rem)`, // (min-width: 1024px)
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`, // (min-width: 1100px)
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`, // (min-width: 1500px)
  ultraWideAndUp: `(min-width: ${BREAKPOINTS.ultraWideMin / 16}rem)`, // (min-width: 1918px)

  xlAndLarger: `(min-width: ${(BREAKPOINTS.xl + 1) / 16}rem)`,
}

export const TRANSITIONS = {
  // Transitions
  normal: `cubic-bezier(0.445, 0.05, 0.55, 0.95)`,
  normalIn: `cubic-bezier(0.47, 0, 0.745, 0.715)`,
  normalOut: `cubic-bezier(0.39, 0.575, 0.565, 1)`,
  snappy: `cubic-bezier(0.77, 0, 0.175, 1)`,
  snappyIn: `cubic-bezier(0.895, 0.03, 0.685, 0.22)`,
  snappyOut: `cubic-bezier(0.165, 0.84, 0.44, 1)`,
}

export const COLOR_MODE_KEY = "color-mode"
export const INITIAL_COLOR_MODE_CSS_PROP = "--initial-color-mode"
