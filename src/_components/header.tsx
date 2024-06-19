import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useContext } from 'react';
import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/router';

export default function Header() {
    const { userName, mudaId, mudaNome } = useContext(LoginContext);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('userName');
        mudaId(null);
        mudaNome('');
        router.push('/');
    };

    return (
        <div className='flex flex-col md:flex-row justify-between items-center bg-customPink pt-4 px-4 gap-3'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image
                        src='/logo.png'
                        alt='Logo Senior'
                        width={300}
                        height={300}
                        className='img-logo'
                    />
                </Link>
            </div>

            <div className='flex justify-center items-center md:w-auto mx-auto'>
                <div className='flex gap-2'>
                    <Input
                        placeholder='Buscar por serviços...'
                        type='text'
                        className='rounded-full border-none text-center p-2 w-96 bg-red-50'
                    />

                    <Button
                        size='icon'
                        variant='link'
                        className='bg-transparent border-none'
                    >
                        <Search className='border-none bg-transparent text-white' />
                    </Button>
                </div>
            </div>

            <div className='flex space-x-4'>
                {userName ? (
                    <>
                        <h1 className='font-semibold text-white text-[15px]'>
                            {userName}
                        </h1>
                        <Button
                            onClick={handleLogout}
                            className='font-semibold text-white text-[15px] cursor-pointer'
                        >
                            Sair
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href='/Perfil/page'>
                            <h1 className='font-semibold text-white text-[15px]'></h1>
                        </Link>
                        <Link href='/Login/page' className='text-white'>
                            <h1 className='font-semibold text-white text-[15px]'>
                                Login
                            </h1>
                        </Link>
                        <Link href='/Cadastro/SelectionPage/page'>
                            <h1 className='font-semibold text-white text-[15px]'>
                                Cadastrar-se
                            </h1>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
