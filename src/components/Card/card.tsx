import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function Card() {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='flex flex-col items-center justify-center w-1/4 h-1/4 bg-white rounded-xl shadow-md'>
                <h1 className='text-2xl font-bold'>Nome do Serviço</h1>
                <p className='text-sm'>Descrição do Serviço</p>
                <p className='text-sm'>Valor do Serviço</p>
                <Button
                    size='icon'
                    variant='link'
                    className='bg-transparent border-none'
                >
                    <Plus className='border-none bg-transparent text-black' />
                </Button>
            </div>
        </div>
    );
}
