import React, { useContext, useEffect, useState } from 'react';
import http from '@/http';
import { useRouter } from 'next/router';
import { Button } from '@/_components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import ISeniorService from '@/Interface/ISenior-Service';

const SeniorProposals = () => {
    const router = useRouter();
    const [seniorServices, setSeniorServices] = useState<ISeniorService | null>(null);
    const { seniorId } = useContext(LoginContext);

    useEffect(() => {
        if (seniorId) {
            http.get(`/seniorService/${seniorId}`)
                .then((response) => {
                    console.log('Resposta da API:', response.data);
                    setSeniorServices(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviços do senior', error);
                });
        }
    }, [seniorId]);

    const deleteContract = (id: number | undefined) => {
        if (id) {
            http.delete(`/seniorService/${id}`)
                .then(() => {
                    console.log(`Contrato ${id} excluído com sucesso.`);
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Erro ao excluir contrato:', error);
                });
        }
    };

    if (!seniorServices) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1>Serviço não encontrado</h1>
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto mt-8 p-8 border rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Detalhes dos Serviços do Senior</h1>

            <div className='mb-4'>
                <p>
                    <span className='font-bold'>Tipo de Serviço:</span> {seniorServices.serviceName}
                </p>
                <p>
                    <span className='font-bold'>Valor:</span> {seniorServices.price}
                </p>

                <p>
                    <span className='font-bold'>Descrição:</span> {seniorServices.description}
                </p>

                <div className='mt-2 flex justify-between'>
                    <Button onClick={() => router.push(`/Senior-Controller/SeniorServiceEdit/${seniorServices.id}`)}>
                        Editar Serviço
                    </Button>
                    <Button onClick={() => router.push(`/Senior-Controller/SeniorProposals/${seniorServices.id}`)}>
                        Ver Propostas
                    </Button>
                    <Button
                        onClick={() => deleteContract(seniorServices.id)}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Excluir contrato
                    </Button>
                </div>
                <hr className='my-4' />
            </div>
        </div>
    );
};

export default SeniorProposals;
