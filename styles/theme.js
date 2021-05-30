import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    gray: {
      50: '#f0f2f5',
      100: '#d6d8db',
      200: '#babdc3',
      300: '#9da2ad',
      400: '#7f8597',
      500: '#666a7f',
      600: '#505161',
      700: '#3a3a45',
      800: '#232229',
      900: '#0a0a0f',
    },
    orange: {
      50: '#ffeee0',
      100: '#ffcdb3',
      200: '#faa984',
      300: '#f78154',
      400: '#f46b25',
      500: '#da600c',
      600: '#ab5608',
      700: '#7b4505',
      800: '#4b2e00',
      900: '#1e1100',
    },
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
        margin: 0,
        padding: 0,
        height: '100%',
      },
      '#__next': {
        height: '100%',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
});

export default theme;
