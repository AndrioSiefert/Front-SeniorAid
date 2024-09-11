import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head />
            <link
                rel="shortcut icon"
                href="/logotipo.png"
                type="image/x-icon"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Fenix&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Montagu+Slab:opsz,wght@16..144,100..700&display=swap"
                rel="stylesheet"
            />

            <title>Senior Aid</title>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
