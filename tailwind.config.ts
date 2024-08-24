import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                verdeSelva: '#9FA48E',
                customLightPink: '#ffe1e3',
                colorHeader: '#D9B589',
                colorHeader2: '#e6decf',
                colorTextLogo: '#78593b',
                colorTextHeader: '#ad9676'
            }
        }
    }
} satisfies Config;

export default config;
