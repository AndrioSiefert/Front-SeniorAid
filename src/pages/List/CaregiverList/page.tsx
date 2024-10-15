import { Button } from '@/_components/ui/button';
import http from '@/http';
import ICaregiverService from '@/Interface/ICaregiver-Service';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CaregiverList() {
    const [caregivers, setCaregivers] = useState<ICaregiverService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        http.get('/caregiver-service/caregiver')
            .then(response => {
                console.log('Dados recebidos:', JSON.stringify(response.data, null, 2));
                setCaregivers(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Erro ao buscar dados:', err);
                setError('Não foi possível carregar os cuidadores. Tente novamente mais tarde.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className='flex text-center'>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-center text-3xl font-bold mb-8'>CUIDADORES DISPONÍVEIS</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {caregivers.map((caregiver, index) => (
                    <div
                        key={index}
                        className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300'>
                        <Image
                            src={`http://localhost:8000/images/${caregiver.caregiver.photo}`}
                            alt={`Foto de ${caregiver.caregiver.name}`}
                            width={200}
                            height={200}
                            className='rounded-full mx-auto mb-4'
                        />

                        <p className='text-lg font-semibold text-center mb-2'>
                            {caregiver.caregiver.name}
                        </p>
                        <Button
                            className='mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600'
                            onClick={() => router.push(`/List/CaregiverInfo/${caregiver.id}`)}>
                            {`Ver informações do ${caregiver.caregiver.name}`}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
