import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='pt-br'>
            <Head />
            <link rel='shortcut icon' href='/old.png' type='image/x-icon' />

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
