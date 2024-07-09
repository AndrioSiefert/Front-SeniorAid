import { LogOut, Menu, Search } from 'lucide-react';
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

    const myServices = `/ServicesOptions/${
        userType === 'senior'
            ? 'Senior-Controller/List-Service'
            : 'Caregiver-Controller/List-Service'
    }/${userId}`;

    const createService = `/ServicesOptions/${
        userType === 'senior'
            ? 'Senior-Controller/Create-Senior-Service/page'
            : 'Caregiver-Controller/Create-Caregiver-Service/page'
    }`;

    const listService = `/List-Service/${
        userType === 'senior'
            ? 'Order-CaregiverList/page'
            : 'Order-SeniorList/page'
    }`;

    return (
        <div className='header sticky inset-x-0 top-0 z-50 flex flex-col md:flex-row justify-center items-center pt-4 px-4 gap-3'>
            <div className='flex items-center justify-center flex-1'>
                <Link href='/'>
                    <Image
                        src='/logo.png'
                        alt='Logo Senior'
                        width={1920}
                        height={1080}
                        className='img-logo'
                    />
                </Link>
            </div>

            <div className='flex justify-center items-center md:w-auto mx-auto flex-1'>
                <div className='flex gap-2 noto-sans '>
                    <Input
                        placeholder='Buscar por serviços...'
                        type='text'
                        className='rounded-full border-none text-center p-2 w-96 bg-slate-300'
                    />

                    <Button
                        size='icon'
                        variant='link'
                        className='bg-transparent border-none'
                    >
                        <Search className='border-none bg-transparent text-black' />
                    </Button>
                </div>
            </div>

            <div className='flex space-x-5 items-center justify-center flex-1 '>
                {userName ? (
                    <>
                        <h1 className='noto-sans  text-black text-[20px]'>
                            {userName}
                        </h1>
                        <div className='text-black'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Menu />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className=' bg-white border border-gray-300 shadow-lg rounded-lg'>
                                    <DropdownMenuLabel className='px-4 py-2 font-bold text-gray-700'>
                                        <Link href={profilePath}>
                                            Meu perfil
                                        </Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='hover:bg-gray-100 px-4 py-2'>
                                        <Link href={createService}>
                                            Criar um serviço
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='hover:bg-gray-100 px-4 py-2'>
                                        <Link href={myServices}>
                                            Meus Serviços
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='hover:bg-gray-100 px-4 py-2'>
                                        <Link href={listService}>
                                            Lista de Serviços
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button
                            onClick={handleLogout}
                            className='noto-sans font-semibold text-black text-[15px] cursor-pointer'
                        >
                            <LogOut />
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href='/Login/Login-Select/page'>
                            <h1 className='noto-sans text-black text-[20px]'>
                                Login
                            </h1>
                        </Link>
                        <Link href='/Registration/SelectionPage/page'>
                            <h1 className='noto-sans text-black text-[20px]'>
                                Cadastrar-se
                            </h1>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
