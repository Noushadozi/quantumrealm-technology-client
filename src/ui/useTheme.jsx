import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const useTheme = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff0000', // very red
            },
            secondary: {
                main: '#00fff0', // very cyan
            },
        },
    });
    return theme
};

export default useTheme;