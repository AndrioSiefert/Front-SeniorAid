import { Button } from '@/_components/ui/button';
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
            <div className='flex justify-center items-center min-h-screen bg-gray-100 text-gray-700'>Carregando...</div>
        );
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-lg w-full'>
                <div className='flex flex-col items-center mb-6'>
                    <Image
                        src={`http://localhost:8000/images/${senior.senior.photo}`} // Altere conforme a estrutura do objeto senior
                        alt={senior.senior.name}
                        width={128}
                        height={128}
                        className='w-32 h-32 rounded-full border-4 border-blue-500 mb-4'
                    />
                    <h1 className='text-3xl font-bold mb-2 text-blue-600'>{senior.senior.name}</h1>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold mb-4 text-center text-blue-500'>Informações do Idoso</h2>
                    <p className='text-gray-700 mb-2'>
                        <strong>Idade:</strong> {senior.senior.age} anos
                    </p>
                    <p className='text-gray-700 mb-2'>
                        <strong>Descrição:</strong> {senior.senior.description}
                    </p>
                    {senior.senior.history && (
                        <p className='text-gray-700 mb-2'>
                            <strong>Histórico:</strong> {senior.senior.history}
                        </p>
                    )}
                    <p className='text-gray-700 mb-4'>
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
                        <Link href='/NossosServicos/SeniorList/page'>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
