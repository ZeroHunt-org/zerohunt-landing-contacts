import type { Config } from 'tailwindcss'

// Subset of zerohunt-landing/tailwind.config.ts: same fonts and the same
// retuned `cyan` / `gray` scales, so shared class names render identically.
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        cyan: {
          50: '#f1f5f8', 100: '#e0e9ef', 200: '#c3d3de', 300: '#a5bdcd', 400: '#8aa8bc',
          500: '#6e8ea4', 600: '#58758a', 700: '#455d6e', 800: '#334552', 900: '#222e37', 950: '#141b21',
        },
        emerald: {
          50: '#f1f6f3', 100: '#dde9e1', 200: '#bcd4c4', 300: '#98bca5', 400: '#7aa88a',
          500: '#5f9171', 600: '#4b765b', 700: '#3c5e49', 800: '#2e4738', 900: '#203127', 950: '#131d17',
        },
        // Lifted for WCAG AA on the near-black background, as on the landing.
        gray: {
          500: '#8b929d',
          600: '#757d89',
        },
      },
    },
  },
  plugins: [],
}

export default config
