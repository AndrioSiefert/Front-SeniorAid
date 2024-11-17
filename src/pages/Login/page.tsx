import { Button } from '@/components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import http from '@/http';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import IJwtPayload from '@/Interface/IJwtPayLoad';

export default function Login() {
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [senhaValue, setSenhaValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { userId, userType, userName, mudaId, mudaNome, mudaUserType, mudaCaregiverId, mudaSeniorId, mudaPhoto } =
        useContext(LoginContext);
    const router = useRouter();

    useEffect(() => {
        if (userId && userName) {
            router.push('/');
        }
    }, [userId, userName, router, userType]);

    function visibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await http.post('user/login', {
                email: emailValue,
                password: senhaValue,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode<IJwtPayload>(token);
            mudaId(decoded.id);
            mudaNome(decoded.name);
            mudaUserType(decoded.userType);
            setErrorMessage('');
            if (decoded.photo) {
                mudaPhoto(decoded.photo);
            }
            if (decoded.caregiverId) {
                mudaCaregiverId(decoded.caregiverId);
            }
            if (decoded.seniorId) {
                mudaSeniorId(decoded.seniorId);
            }
            router.push('/');
        } catch (error) {
            console.log(error);
            setErrorMessage('E-mail ou senha incorretos. Tente novamente.');
        }
    };

    return (
        <div className='relative flex h-screen bg-colorHeader'>
            <div className='absolute inset-0'>
                <Image
                    src='/Retratoo.jpg'
                    alt='Logo Senior'
                    layout='fill'
                    objectFit='cover'
                    className='opacity-50 blur-sm filter'
                />
            </div>

            <div className='relative flex flex-1 flex-col items-center justify-center p-8'>
                <div className='w-full max-w-md rounded-lg bg-white bg-opacity-80 p-8 shadow-lg'>
                    <h1 className='mb-4 text-center text-3xl font-bold'>Bem-vindo de volta!</h1>
                    <p className='mb-6 text-center'>Acesse a sua conta para ter acesso a todas as funcionalidades.</p>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='mb-2 block font-semibold text-gray-700' htmlFor='email'>
                                E-mail:
                            </label>
                            <input
                                className='w-full rounded-lg border-2 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                type='email'
                                id='email'
                                name='email'
                                onChange={(e) => {
                                    setEmailValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='mb-2 block font-semibold text-gray-700' htmlFor='password'>
                                Senha:
                            </label>
                            <div className='relative'>
                                <input
                                    className='w-full rounded-lg border-2 border-gray-300 p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    type={senhaVisivel ? 'text' : 'password'}
                                    id='password'
                                    name='password'
                                    value={senhaValue}
                                    onChange={(e) => {
                                        setSenhaValue(e.target.value);
                                    }}
                                />
                                <button
                                    type='button'
                                    onClick={visibilidadeSenha}
                                    className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'
                                >
                                    {senhaVisivel ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Button
                                type='submit'
                                className='mb-4 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700'
                            >
                                Entrar
                            </Button>
                            {errorMessage && <p className='mb-4 text-center text-red-500'>{errorMessage}</p>}
                            <p className='mb-2 text-gray-500'>ou</p>
                            <Link href='/Registration/page'>
                                <Button className='w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600'>
                                    Criar conta
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
