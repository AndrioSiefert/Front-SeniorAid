import { Menu, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useContext } from 'react';
import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/router';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu';

export default function Header() {
    const { userId, userName, userType, mudaId, mudaNome, mudaUserType } =
        useContext(LoginContext);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        mudaId(null);
        mudaNome('');
        mudaUserType('');
        router.push('/');
    };

    const profilePath = `/Profile/${
        userType === 'senior' ? 'Profile-Senior' : 'Profile-Caregiver'
    }/${userId}`;

    return (
        <div className='header flex flex-col md:flex-row justify-between items-center pt-4 px-4 gap-3'>
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

            <div className='flex space-x-4 items-center'>
                {userName ? (
                    <>
                        <h1 className='font-semibold text-white text-[15px]'>
                            {userName}
                        </h1>
                        <div className='text-white'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Menu />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        <Link href={profilePath}>
                                            Meu perfil
                                        </Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href='/'>Quero um Cuidador</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
                        <Link
                            href='/Login/Login-Select/page'
                            className='text-white'
                        >
                            <h1 className='font-semibold text-white text-[15px]'>
                                Login
                            </h1>
                        </Link>
                        <Link href='/Registration/SelectionPage/page'>
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
