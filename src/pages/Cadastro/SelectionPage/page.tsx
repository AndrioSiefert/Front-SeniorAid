import Image from 'next/image';
import Link from 'next/link';

export default function SelectionPage() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Link href='/Cadastro/cadastro-senior/page'>
                <h1 className='cursor-pointer mx-4'>
                    Cadastrar-se como Senior
                </h1>
            </Link>

            <Link href='/Cadastro/cadastro-cuidador/page'>
                <h1 className='cursor-pointer mx-4 '>
                    Cadastrar-se como Cuidador
                </h1>
            </Link>
        </div>
    );
}
