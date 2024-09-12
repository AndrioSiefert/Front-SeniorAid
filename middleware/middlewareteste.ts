// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get('token')?.value; // Obtém o token do cookie.

//     // Verifica se o token existe
//     if (!token) {
//         return NextResponse.redirect(new URL('/login', req.url)); // Redireciona para a página de login.
//     }

//     try {
//         // Verifica e decodifica o token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
//             userType: string;
//         };

//         // Verifica se o usuário é "senior" para acessar páginas de idosos
//         if (
//             req.nextUrl.pathname.startsWith('/senior') &&
//             decoded.userType !== 'senior'
//         ) {
//             return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redireciona para uma página de "acesso negado".
//         }

//         // Verifica se o usuário é "caregiver" para acessar páginas de cuidadores
//         if (
//             req.nextUrl.pathname.startsWith('/caregiver') &&
//             decoded.userType !== 'caregiver'
//         ) {
//             return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redireciona para uma página de "acesso negado".
//         }

//         // Se o token for válido e as permissões estiverem corretas, continua
//         return NextResponse.next();
//     } catch (error) {
//         console.error('Erro de autenticação:', error);
//         return NextResponse.redirect(new URL('/login', req.url)); // Se o token for inválido ou expirar, redireciona para login.
//     }
// }

// export const config = {
//     matcher: ['/senior/:path*', '/caregiver/:path*'] // Define os caminhos que o middleware deve interceptar
// };
