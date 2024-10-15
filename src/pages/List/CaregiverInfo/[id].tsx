import { Button } from '@/_components/ui/button';
import http from '@/http';
import ICaregiverService from '@/Interface/ICaregiver-Service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '@/context/LoginContext'; // Ajuste o caminho conforme necessário

export default function CaregiverInfo() {
    const router = useRouter();
    const { id } = router.query;
    const [caregiver, setCaregiver] = useState<ICaregiverService | null>(null);
    const { userType } = useContext(LoginContext);

    useEffect(() => {
        if (id) {
            http.get(`/caregiver-service/${id}`)
                .then(response => {
                    setCaregiver(response.data);
                })
                .catch(error => {
                    console.error('Erro ao carregar serviço do cuidador', error);
                });
        }
    }, [id]);

    if (!caregiver) {
        return (
            <div className='flex justify-center items-center min-h-screen bg-gray-100 text-gray-700'>
                Carregando...
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-lg w-full'>
                <div className='flex flex-col items-center mb-6'>
                    <Image
                        src={caregiver.caregiver.photo}
                        alt={caregiver.caregiver.name}
                        width={128}
                        height={128}
                        className='w-32 h-32 rounded-full border-4 border-blue-500 mb-4'
                    />
                    <h1 className='text-3xl font-bold mb-2 text-blue-600'>
                        {caregiver.caregiver.name}
                    </h1>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold mb-4 text-center text-blue-500'>
                        Informações do Serviço
                    </h2>
                    <p className='text-gray-700 mb-2'>
                        <strong>Sobre:</strong> {caregiver.about}
                    </p>
                    <p className='text-gray-700 mb-2'>
                        <strong>Preferencia:</strong> {caregiver.preference}
                    </p>
                    {caregiver.experience && (
                        <p className='text-gray-700 mb-2'>
                            <strong>Experiência:</strong> {caregiver.experience}
                        </p>
                    )}

                    <p className='text-gray-700 mb-2'>
                        <strong>Sobre Mim:</strong> {caregiver.about}
                    </p>
                    <p className='text-gray-700 mb-4'>
                        <strong>Preço:</strong> R${caregiver.price.toFixed(2)}
                    </p>
                </div>
                {userType === 'senior' && (
                    <div className='mb-6 text-center'>
                        <Button className='bg-green-500 text-white hover:bg-green-600'>
                            <Link href={`/Senior-Controller/request-contract/${id}`}>
                                Solicitar Contrato
                            </Link>
                        </Button>
                    </div>
                )}
                <div className='text-center'>
                    <Button className='bg-blue-500 text-white hover:bg-blue-600'>
                        <Link href='/List/CaregiverList/page'>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
