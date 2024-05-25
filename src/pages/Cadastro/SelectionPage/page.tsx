import Image from 'next/image';
import Link from 'next/link';

export default function SelectionPage() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Link href='/cadastro-senior'>
                <h1 className='cursor-pointer mx-4'>
                    Cadastrar-se como Senior
                </h1>
                <Image
                    src='/cuidador.png'
                    alt='Logo Senior'
                    width={500}
                    height={200}
                />
            </Link>

            <Link href='/Cadastro/cadastro-cuidador/page'>
                <h1 className='cursor-pointer mx-4 '>
                    Cadastrar-se como Cuidador
                </h1>
                <Image
                    src='/cuidador.png'
                    alt='Logo Senior'
                    width={500}
                    height={200}
                />
            </Link>
        </div>
    );
}
