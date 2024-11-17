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
    const [caregiver, setCaregiver] = useState<ICaregiverService | null>(null);
    const { userType } = useContext(LoginContext);

    useEffect(() => {
        if (id) {
            http.get(`/caregiver-service/${id}`)
                .then((response) => {
                    setCaregiver(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviço do cuidador', error);
                });
        }
    }, [id]);

    if (!caregiver) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-gray-100 text-gray-700'>Carregando...</div>
        );
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
            <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-6 flex flex-col items-center'>
                    <Image
                        src={`http://localhost:8000/images/${caregiver.caregiver.photo}`}
                        alt={caregiver.caregiver.name}
                        width={128}
                        height={128}
                        className='mb-4 h-32 w-32 rounded-full border-4 border-blue-500'
                    />
                    <h1 className='mb-2 text-3xl font-bold text-blue-600'>{caregiver.caregiver.name}</h1>
                </div>
                <div className='mb-6'>
                    <h2 className='mb-4 text-center text-2xl font-semibold text-blue-500'>Informações do Serviço</h2>
                    <p className='mb-2 text-gray-700'>
                        <strong>Sobre:</strong> {caregiver.about}
                    </p>
                    <p className='mb-2 text-gray-700'>
                        <strong>Preferencia:</strong> {caregiver.preference}
                    </p>
                    {caregiver.experience && (
                        <p className='mb-2 text-gray-700'>
                            <strong>Experiência:</strong> {caregiver.experience}
                        </p>
                    )}

                    <p className='mb-2 text-gray-700'>
                        <strong>Sobre Mim:</strong> {caregiver.about}
                    </p>
                    <p className='mb-4 text-gray-700'>
                        <strong>Preço:</strong> R${caregiver.price}
                    </p>
                </div>
                {userType === 'senior' && (
                    <div className='mb-6 text-center'>
                        <Button className='bg-green-500 text-white hover:bg-green-600'>
                            <Link href={`/Contract/Senior-Contract-request-to-caregiver/${id}`}>
                                Solicitar Contrato
                            </Link>
                        </Button>
                    </div>
                )}
                <div className='text-center'>
                    <Button className='bg-blue-500 text-white hover:bg-blue-600'>
                        <Link href='/Services-Controller/ServiceCaregiverList/page'>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
