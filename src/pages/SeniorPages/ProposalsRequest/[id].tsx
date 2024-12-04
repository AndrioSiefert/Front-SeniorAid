// não funcional ainda

import { Button } from '@/components/ui/button';
import http from '@/http';
import ICaregiverService from '@/Interface/ICaregiver-Service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '@/context/LoginContext';

export default function CaregiverInfo() {
    const router = useRouter();
    const { id } = router.query;
    const [service, setService] = useState<ICaregiverService | null>(null);
    const { userId } = useContext(LoginContext);

    useEffect(() => {
        if (id) {
            http.get(`/caregiver-service/${id}`)
                .then((response) => {
                    setService(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviço do cuidador', error);
                });
        }
    }, [id]);

    const requestService = () => {
        if (userId && service) {
            const serviceRequest = {
                SeniorId: userId,
                serviceId: service.id,
            };

            http.post('http://localhost:8000/service-request', serviceRequest)
                .then((response) => {
                    alert('Serviço solicitado com sucesso!');
                })
                .catch((error) => {
                    console.error('Erro ao solicitar serviço:', error);
                });
        } else {
            console.error('Caregiver ID or Service is missing');
        }
    };

    if (!service) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-gray-100 text-gray-700'>Carregando...</div>
        );
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
            <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-6 flex flex-col items-center'>
                    <Image
                        src={`http://localhost:8000/images/${service.caregiver.photo}`}
                        alt={service.caregiver.name}
                        width={128}
                        height={128}
                        className='mb-4 h-32 w-32 rounded-full border-4 border-blue-500'
                    />
                    <h1 className='mb-2 text-3xl font-bold text-blue-600'>{service.caregiver.name}</h1>
                </div>
                <div className='mb-6'>
                    <h2 className='mb-4 text-center text-2xl font-semibold text-blue-500'>Informações do Serviço</h2>
                    <p className='mb-2 text-gray-700'>
                        <strong>Sobre:</strong> {service.experience}
                    </p>
                    <p className='mb-2 text-gray-700'>
                        <strong>Preferencia:</strong> {service.preference}
                    </p>

                    <p className='mb-2 text-gray-700'>
                        <strong>Sobre Mim:</strong> {service.experience}
                    </p>
                    <p className='mb-4 text-gray-700'>
                        <strong>Preço:</strong> R${service.price}
                    </p>
                </div>

                <div className='mb-6 text-center'>
                    <Button className='bg-green-500 text-white hover:bg-green-600' onClick={requestService}>
                        Solicitar Serviço
                    </Button>
                </div>

                <div className='text-center'>
                    <Button className='bg-blue-500 text-white hover:bg-blue-600'>
                        <Link href='/List/ServiceToSenior/page'>Voltar</Link>
                    </Button>
                    <Button onClick={() => router.push(`/CaregiverPages/CaregiverFeedback/${service.caregiver.id}`)}>
                        Ver Feedbaks
                    </Button>
                </div>
            </div>
        </div>
    );
}
