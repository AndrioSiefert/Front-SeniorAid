import Header from '../components/header';
import LoginProvider from '@/context/LoginContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <LoginProvider>
            <Header />
            <Component {...pageProps} />
        </LoginProvider>
    );
}
