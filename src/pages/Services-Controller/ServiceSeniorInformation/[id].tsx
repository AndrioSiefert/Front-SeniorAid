import { Button } from '@/components/ui/button';
import http from '@/http';
import ISeniorService from '@/Interface/ISenior-Service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '@/context/LoginContext';

export default function SeniorInfo() {
    const router = useRouter();
    const { id } = router.query;
    const [senior, setSenior] = useState<ISeniorService | null>(null);
    const { userType } = useContext(LoginContext);

    useEffect(() => {
        if (id) {
            http.get(`/seniorService/id/${id}`)
                .then((response) => {
                    setSenior(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar informações do idoso', error);
                });
        }
    }, [id]);

    if (!senior) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-gray-100 text-gray-700'>Carregando...</div>
        );
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
            <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-6 flex flex-col items-center'>
                    <Image
                        src={`http://localhost:8000/images/${senior.senior.photo}`} // Altere conforme a estrutura do objeto senior
                        alt={senior.senior.name}
                        width={128}
                        height={128}
                        className='mb-4 h-32 w-32 rounded-full border-4 border-blue-500'
                    />
                    <h1 className='mb-2 text-3xl font-bold text-blue-600'>{senior.senior.name}</h1>
                </div>
                <div className='mb-6'>
                    <h2 className='mb-4 text-center text-2xl font-semibold text-blue-500'>Informações do Idoso</h2>
                    <p className='mb-2 text-gray-700'>
                        <strong>Idade:</strong> {senior.senior.age} anos
                    </p>
                    <p className='mb-2 text-gray-700'>
                        <strong>Descrição:</strong> {senior.senior.description}
                    </p>
                    {senior.senior.history && (
                        <p className='mb-2 text-gray-700'>
                            <strong>Histórico:</strong> {senior.senior.history}
                        </p>
                    )}
                    <p className='mb-4 text-gray-700'>
                        <strong>Condições de Saúde:</strong> {senior.senior.healthConditions}
                    </p>
                </div>
                {userType === 'caregiver' && (
                    <div className='mb-6 text-center'>
                        <Button className='bg-green-500 text-white hover:bg-green-600'>
                            <Link href={`/Contract/Contract-request-to-senior/${id}`}>Solicitar Contrato</Link>
                        </Button>
                    </div>
                )}
                <div className='text-center'>
                    <Button className='bg-blue-500 text-white hover:bg-blue-600'>
                        <Link href='/Services-Controller/ServiceSeniorList/page'>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
