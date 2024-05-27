import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export default function Header() {
    const [busca, setBusca] = useState('');

    return (
        <div className='flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-500 pt-4 px-4 gap-3'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image
                        src='/logo.png'
                        alt='Logo Senior'
                        width={100}
                        height={200}
                    />
                </Link>
                <h1 className='text-white text-2xl font-bold italic'>
                    Senior Aid
                </h1>
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
            </div>
        </div>
    );
}
