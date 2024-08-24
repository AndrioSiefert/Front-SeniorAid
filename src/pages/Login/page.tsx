import { Button } from '@/_components/ui/button';
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
    const { userId, userType, userName, mudaId, mudaNome, mudaUserType } =
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
                password: senhaValue
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode<IJwtPayload>(token);
            mudaId(decoded.id);
            mudaNome(decoded.name);
            mudaUserType(decoded.userType);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex items-center h-screen'>
            <div className='w-1/2'>
                <Image
                    src='/loginn.png'
                    alt='Logo Senior'
                    width={350}
                    height={100}
                />
            </div>

            <div className='flex justify-end items-center h-full'>
                <div className='text-center'>
                    <div className='mb-4'>
                        <h1 className='text-3xl font-bold'>Login</h1>

                        <p>
                            Acesse o Senior Aid para ter acesso a todas as
                            funcionalidades.
                        </p>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex justify-normal'>
                                <label className='p-2' htmlFor='email'>
                                    E-mail:
                                </label>
                                <input
                                    className='rounded-full border-2 border-gray-300 p-2 w-96'
                                    type='email'
                                    id='email'
                                    name='email'
                                    onChange={(e) => {
                                        setEmailValue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='mt-4'>
                                <label className='p-2' htmlFor='password'>
                                    Senha:
                                </label>
                                <input
                                    className='rounded-full border-2 border-gray-300 p-2 w-96'
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
                                    className='ml-2 '
                                >
                                    {senhaVisivel ? <EyeOff /> : <Eye />}
                                </button>
                            </div>

                            <div className='mt-4'>
                                <Button type='submit'>Entrar</Button>

                                <p>ou</p>

                                <Link href='/Cadastro/SelectionPage/page'>
                                    <Button>Criar conta</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
