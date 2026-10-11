/**
 * Notion "warm paper notebook" design system.
 * Tokens mirror docs/redesign-2026/02-prd-and-design.md — keep the two in sync.
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        // Core surfaces + ink
        paper: '#f6f5f4',
        ink: '#000000',
        charcoal: '#111111',
        stone: '#757575',
        graphite: '#615d59',
        slate: '#696969',
        // The single chromatic action
        notion: '#0075de',
        sky: '#e6f3fe',
        // Rotating accent cast for card backgrounds
        marigold: '#ffb110',
        coral: '#f64932',
        saffron: '#e89d01',
        vermillion: '#e32d14',
        mocha: '#b18164',
        signal: '#097fe8',
        skywash: '#62aef0',
        midnight: '#02093a',
        // Hairline border — the system's only separator
        hairline: 'rgba(0,0,0,0.08)',
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.33', letterSpacing: '0.12px' }],
        'body-sm': ['14px', { lineHeight: '1.43' }],
        body: ['16px', { lineHeight: '1.5' }],
        subheading: ['20px', { lineHeight: '1' }],
        'heading-sm': ['22px', { lineHeight: '1.27', letterSpacing: '-0.242px' }],
        heading: ['40px', { lineHeight: '1.5' }],
        'heading-lg': ['48px', { lineHeight: '1.5' }],
        'display-sm': ['54px', { lineHeight: '1.04', letterSpacing: '-1.89px' }],
        display: ['72px', { lineHeight: '1.21', letterSpacing: '-2.016px' }],
        'display-lg': ['96px', { lineHeight: '1.04', letterSpacing: '-4.608px' }],
      },
      borderRadius: {
        small: '4px',
        buttons: '8px',
        cards: '12px',
      },
      maxWidth: { page: '1440px' },
      spacing: { section: '80px' },
      boxShadow: {
        // Shadows are permitted ONLY on the nav and product mockups — never on content cards.
        nav: '0px 0.7px 1.462px 0px rgba(0,0,0,0.015), 0px 3px 9px 0px rgba(0,0,0,0.03)',
        mockup: '0px 4px 12px rgba(0,0,0,0.1)',
      },
      transitionDuration: { DEFAULT: '200ms' },
      keyframes: {
        'mark-pop': {
          '0%': { transform: 'scale(0.6) rotate(-8deg)', opacity: '0' },
          '60%': { transform: 'scale(1.08) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'rise': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        // Spring/bounce is reserved for character marks and hero elements.
        'mark-pop': 'mark-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        rise: 'rise 480ms ease both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
