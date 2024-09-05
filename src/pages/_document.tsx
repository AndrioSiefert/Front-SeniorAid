import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='pt-br'>
            <Head />
            <link
                rel='shortcut icon'
                href='/logotipo.png'
                type='image/x-icon'
            />
            <link
                href='https://fonts.googleapis.com/css2?family=Emilys+Candy&display=swap'
                rel='stylesheet'
            />

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
