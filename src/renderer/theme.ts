import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#dd2c00',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

export default createTheme(themeOptions);
