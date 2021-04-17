import { createMuiTheme, useMediaQuery } from "@material-ui/core";

export const theme = (darkMode: boolean) => {
    return createMuiTheme({
        palette: {
            primary: {
                main: "#000000"
            },
            secondary: {
                main: "#256ef5"
            },
            type: darkMode ? 'dark' : 'light'
        },
        typography: {
            htmlFontSize: 18,
            fontFamily: [
                'Inter',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'system-ui',
                'sans-serif',
            ].join(','),
    
            button: {
                textTransform: "unset",
                fontSize: "14px",
                fontWeight: 600
            }
        },
        shape: {
            borderRadius: 8   
        },
        props: {
            MuiButtonBase: {
                disableRipple: false,
            },
        },
    });
}