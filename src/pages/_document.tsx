import Header from '@/_components/header';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='bt-br'>
            <Head />
            <link rel='shortcut icon' href='/old.png' type='image/x-icon' />

            <body>
                <Header />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
