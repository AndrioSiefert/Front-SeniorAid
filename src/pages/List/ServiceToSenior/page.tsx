import { Button } from '@/components/ui/button';
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
            .then((response) => {
                // console.log('Dados recebidos:', JSON.stringify(response.data, null, 2));
                setCaregivers(response.data);
                setLoading(false);
            })
            .catch((err) => {
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
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h1 className='mb-8 text-center text-3xl font-bold'>CUIDADORES DISPONÍVEIS</h1>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {caregivers.map((caregiver, index) => (
                    <div
                        key={index}
                        className='rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'
                    >
                        <Image
                            src={`http://localhost:8000/images/${caregiver.caregiver.photo}`}
                            alt={`Foto de ${caregiver.caregiver.name}`}
                            width={200}
                            height={200}
                            className='mx-auto mb-4 rounded-full'
                        />

                        <p className='mb-2 text-center text-lg font-semibold'>{caregiver.caregiver.name}</p>
                        <Button
                            className='mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600'
                            onClick={() => router.push(`/SeniorPages/ProposalsRequest/${caregiver.caregiver.id}`)}
                        >
                            {`Ver informações do ${caregiver.caregiver.name}`}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
