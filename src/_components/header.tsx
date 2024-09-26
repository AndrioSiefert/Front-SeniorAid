import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
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
import { routes } from '@/routes/constants';
import Image from 'next/image';
import { FaRegUser } from 'react-icons/fa';
import { Button } from './ui/button';

export default function Header() {
    const router = useRouter();
    const { userId, userName, userType, mudaId, mudaNome, mudaUserType } =
        useContext(LoginContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        mudaId(null);
        mudaNome('');
        mudaUserType('');
        router.push('/');
    };

    const profilePath = routes.profilePath(userType, userId);
    const myServices = routes.myServices(userType, userId);
    const createService = routes.createService(userType);
    const listService = routes.listService(userType);

    return (
        <header className='flex flex-col sm:flex-row justify-between items-center sm:sticky sm:inset-x-0 sm:top-0 sm:z-50 bg-colorHeader2 p-7'>
            <nav className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center courgette'>
                <Link href='/'>
                    <Button>
                        <h1>Sobre Nós</h1>
                    </Button>
                </Link>
                <Link href='/Information/page'>
                    <Button>Como Funciona?</Button>
                </Link>
                <Link href='/List/CaregiverList/page'>
                    <Button>
                        <h1>Nossos Serviços</h1>
                    </Button>
                </Link>
            </nav>

            <div className='relative my-4 sm:my-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-center emilys-candy-regular'>
                <Link href='/'>
                    <Image
                        src='/logotipo.png'
                        alt='Logo Senior'
                        width={200}
                        height={200}
                        className='object-cover'
                    />
                </Link>
            </div>

            <aside className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4'>
                {userName ? (
                    <>
                        <h1 className='text-black text-[20px]'>{userName}</h1>
                        <div className='text-black'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Menu />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-white border border-gray-300 shadow-lg rounded-lg'>
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
                        <Link href='/Login/page'>
                            <Button className='text-xl p-1 fenix gap-1'>
                                <FaRegUser size={28} />
                                Entrar
                            </Button>
                        </Link>
                        <Link href='/Registration/page'>
                            <Button className='text-lg bg-yellow-500 text-white border-2 border-yellow-600 hover:bg-yellow-600'>
                                Cadastrar-se
                            </Button>
                        </Link>
                    </>
                )}
            </aside>
        </header>
    );
}
