/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http', // Permite http
                hostname: 'localhost', // Adiciona localhost
                port: '8000', // Especifica a porta, se necessário
                pathname: '/images/**', // Permite qualquer imagem na rota /images
            },
            {
                protocol: 'https', // Mantém para https
                hostname: '**', // Mantém qualquer hostname para https
            },
        ],
    },
};

export default nextConfig;
