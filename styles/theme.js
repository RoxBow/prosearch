import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
        margin: 0,
        padding: 0,
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
