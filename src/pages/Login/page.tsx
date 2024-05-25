import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Login() {
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [senhaValue, setSenhaValue] = useState('');

    function visibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel);
    }

    return (
        <div className='flex items-center h-screen bg-HomeNav'>
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
                        <form>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                className='rounded-full'
                                type='email'
                                id='email'
                                name='email'
                            />
                            <div className='mt-4'>
                                <label htmlFor='password'>Senha</label>
                                <input
                                    className='rounded-full'
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
                                <p className='italic'>Esqueceu sua senha?</p>
                                <button>Entrar</button>
                                <p>ou</p>
                                <p>
                                    Não tem uma conta?
                                    <button>Criar conta</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
