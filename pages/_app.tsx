import { AccountProvider } from '../contexts/account'
import '../styles/myStyles.scss'



const CustomApp = ({ Component, pageProps }) => (
    <AccountProvider>
        <Component {...pageProps} />
    </AccountProvider>
);
export default CustomApp;