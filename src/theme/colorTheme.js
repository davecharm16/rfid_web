import { createTheme } from '@mui/material/styles';

export const colors  = () => ({... {
        primary : "#025464",
        secondary : "#E57C23",
        tertiary : "#E8AA42",
        bg : "#F8F1F1"
    } 
})


export const myTheme = () =>{
    const color = colors();
    return createTheme({
        palette: {
          primary: {
            main: color.primary,
          },
          secondary: {
            main: color.secondary,
          },
        },
        typography: {
            fontFamily: ['Montserrat', 'sans-serif'].join(','),
            fontSize : 12,
            h1  : {           
                 fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize : 40,
            },
            h2  : {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize : 32,
            },
            h3  : {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize : 24,
            },
            h4  : {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize : 20,
            },
            h5  : {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize : 16,
            },
            h6  : {
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize : 14,
            },
        },
    });
}
