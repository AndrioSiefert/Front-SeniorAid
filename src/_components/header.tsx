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
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { routes } from '@/routes/constants';
import Image from 'next/image';
import { FaRegUser } from 'react-icons/fa';
import { Button } from './ui/button';

export default function Header() {
    const router = useRouter();

    const {
        userId,
        photo,
        userName,
        userType,
        mudaId,
        mudaNome,
        mudaUserType,
    } = useContext(LoginContext);

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
        <header className='flex fenix flex-col items-center justify-between w-4/5 mx-auto ||| lg:flex-row'>
            <div className='flex justify-center'>
                <Link href='/'>
                    <Image
                        src='/logotipo.png'
                        alt='Logo Senior'
                        width={150}
                        height={150}
                        className='flex'
                    />
                </Link>
            </div>
            <div className='flex mb-5'>
                <Link href='/'>
                    <Button>
                        <h1 className='text-lg'>Sobre Nós</h1>
                    </Button>
                </Link>
                <Link href='/Information/page'>
                    <Button className='text-lg'>Como Funciona?</Button>
                </Link>
                <Link href='NossosServicos/CaregiverList/page'>
                    <Button>
                        <h1 className='text-lg'>Nossos Serviços</h1>
                    </Button>
                </Link>
            </div>

            <div className='flex items-center mb-5'>
                {userName ? (
                    <div className='flex items-center space-x-2'>
                        <Image
                            src={`http://localhost:8000/images/${photo}`}
                            alt='Foto do usuário'
                            width={40}
                            height={40}
                            className='rounded-lg'
                        />
                        <h1 className='text-black text-[20px] fenix'>
                            {userName}
                        </h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Menu />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-white border border-gray-300 shadow-lg rounded-lg'>
                                <DropdownMenuLabel className='px-4 py-2 font-bold text-gray-700'>
                                    <Link href={profilePath}>Meu perfil</Link>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='hover:bg-gray-100 px-4 py-2'>
                                    <Link href={createService}>
                                        Criar um serviço
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='hover:bg-gray-100 px-4 py-2'>
                                    <Link href={myServices}>Meus Serviços</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='hover:bg-gray-100 px-4 py-2'>
                                    <Link href={listService}>
                                        Lista de Serviços
                                    </Link>
                                </DropdownMenuItem>
                                <Button
                                    onClick={handleLogout}
                                    className='noto-sans font-semibold text-black text-[15px] cursor-pointer'
                                >
                                    Sair
                                    <LogOut />
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className='flex items-center'>
                        <Link href='/Registration/page'>
                            <Button className='text-lg bg-yellow-500 text-white border-2 border-yellow-600 hover:bg-yellow-600'>
                                Cadastrar-se
                            </Button>
                        </Link>
                        <Link href='/Login/page'>
                            <Button className='courgette gap-2 mx-2 text-lg bg-blue-500 text-white border-2 border-blue-600 hover:bg-blue-600'>
                                Entrar
                                <FaRegUser size={24} />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
