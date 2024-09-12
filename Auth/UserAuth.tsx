import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { jwtDecode } from 'jwt-decode';
import IJwtPayload from '@/Interface/IJwtPayLoad';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = nookies.get(context);
    const UserToken = cookies.token;

    if (!UserToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    try {
        const decoded = jwtDecode<IJwtPayload>(UserToken);

        // Verifique se exp está definido antes de realizar a comparação
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            throw new Error('Token inválido ou expirado');
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
}
