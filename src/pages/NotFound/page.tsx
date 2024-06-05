import Image from 'next/image';

export default function NotFound() {
    return (
        <div>
            <Image src='404.png' alt='Pagina não encontrada' />
        </div>
    );
}
