import Image from 'next/image';

export default function NotFound() {
    return (
        <div>
            <Image
                src='/404.png'
                width={500}
                height={500}
                alt='Pagina não encontrada'
            />
        </div>
    );
}
