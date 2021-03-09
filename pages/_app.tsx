import { AccountProvider } from '../contexts/account'


const CustomApp = ({ Component, pageProps }) => (
    <AccountProvider>
        <Component {...pageProps} />
    </AccountProvider>
);
export default CustomApp;