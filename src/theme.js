import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  palette: {
    primary: {
      main: '#004ab5',
    },
    secondary: {
      main: '#05AFF2',
      light: 'rgba(5, 175, 242, 0.08)',
    },
    error: {
      main: '#E31B0C',
    },
    success: {
      main: '#4CAF50',
    },
    danger: {
      main: '#E31B0C',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito, sans-serif';
        }
      `,
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          height: '48px',
          width: '100%',
          fontFamily: 'Nunito, sans-serif',
          padding: '7.5px 10px',
          '& .MuiSvgIcon-root': {
            color: '#408BDD',
          },
          '&:focus-within .MuiSvgIcon-root': {
            color: '#408BDD',
          },
          '&.Mui-disabled': {
            background: '#fff',
          },
          notchedOutline: {
            border: '1px solid #e7e7e7e7',
          },
        },
        input: {
          padding: '0',
          fontSize: '0.75rem',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 400,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#333333',
          fontSize: '0.75rem',
          lineHeight: '1rem',
          letterSpacing: '0.00875rem',
          fontWeight: 700,
          marginBottom: '0.1875rem',
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          '&.Mui-error': {
            color: 'none',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito, sans-serif',
          textTransform: 'none',
          fontSize: '.75rem',
          lineHeight: '1.5rem',
          color: '#333',
          '&.Mui-selected': {
            color: '#e7e7e7e7',
            fontWeight: '600',
            outline: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            height: '5px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
    MuiPickersCalendarHeaderRoot: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito Sans',
        },
      },
    },
  },
});
