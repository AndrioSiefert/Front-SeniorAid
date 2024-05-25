import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button/Button';

export default function Header() {
    return (
        <div className=' flex bg-black pt-4 px-4 gap-3'>
            <Image src='/logo.png' alt='Logo Senior' width={100} height={200} />

            <div className='flex flex-auto justify-between items-center'>
                <h1 className='text-white text-2xl font-bold italic'>
                    Senior Aid
                </h1>

                <div className='flex gap-2'>
                    <input
                        placeholder='Buscar por serviços...'
                        type='text'
                        className='rounded-full border-none text-center p-2 w-96'
                    />
                    <Button>
                        <Search className='border-none bg-transparent text-white' />
                    </Button>
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
        </div>
    );
}
