import { LogOut, Menu, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
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

    const profilePath = routes.profilePath(userType, userId);
    const myServices = routes.myServices(userType, userId);
    const createService = routes.createService(userType);
    const listService = routes.listService(userType);

    return (
        <header className='flex justify-between items-center  sticky inset-x-0 top-0 z-50 bg-colorHeader2 p-7'>
            <nav className='flex space-x-4'>
                <Link href='/'>
                    <Button>
                        <h1>Sobre nós</h1>
                    </Button>
                </Link>
                <Link href='/'>
                    <Button>Contato</Button>
                </Link>
                <Link href='/'>
                    <Button>
                        <h1>Serviços</h1>
                    </Button>
                </Link>
                <Link href='/'>
                    <Button>Contato</Button>
                </Link>
                <Link href='/'>
                    <Button>Contato</Button>
                </Link>
            </nav>

            <div className='absolute left-1/2 transform -translate-x-1/2 text-center emilys-candy-regular'>
                <Link href='/'>
                    <h1 className='text-colorTextLogo text-5xl'>
                        SENIOR
                        <span className='block text-2xl'>AID</span>
                    </h1>
                </Link>
            </div>

            <aside className='flex items-center space-x-4'>
                {userName ? (
                    <>
                        <h1 className=' text-black text-[20px]'>{userName}</h1>
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
                            <Button className='text-lg p-1'>
                                <UserRound size={28} />
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
