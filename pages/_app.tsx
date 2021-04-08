import { AccountProvider } from '../contexts/account'
import '../styles/myStyles.scss'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'


const theme = createMuiTheme({
        palette: {
          type: "dark",
        }
      });

const CustomApp = ({ Component, pageProps }) => (
        <ThemeProvider theme={theme}>
                <Component {...pageProps} />
        </ThemeProvider>

);
export default CustomApp;