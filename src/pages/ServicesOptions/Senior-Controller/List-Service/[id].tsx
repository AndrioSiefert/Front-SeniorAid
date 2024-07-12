import React, { useContext, useEffect, useState } from 'react';
import http from '@/http';
import { useRouter } from 'next/router';
import { Button } from '@/_components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import ISeniorService from '@/Interface/ISenior-Service';

const SeniorProposals = () => {
    const router = useRouter();
    const [seniorServices, setSeniorServices] = useState<ISeniorService[]>([]);
    const { userId } = useContext(LoginContext);

    useEffect(() => {
        if (userId) {
            http.get(`/seniorService/senior/${userId}`)
                .then((response) => {
                    setSeniorServices(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviços do senior', error);
                });
        }
    }, [userId]);

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

    if (seniorServices.length === 0) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1>Nenhum serviço encontrado</h1>
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto mt-8 p-8 border rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>
                Detalhes dos Serviços do Senior
            </h1>

            {seniorServices.map((service) => (
                <div key={service.id} className='mb-4'>
                    <p>
                        <span className='font-bold'>Tipo de Serviço:</span>{' '}
                        {service.serviceType}
                    </p>
                    <p>
                        <span className='font-bold'>Valor:</span>{' '}
                        {service.price}
                    </p>
                    <p>
                        <span className='font-bold'>Localização:</span>{' '}
                        {service.location}
                    </p>
                    <p>
                        <span className='font-bold'>Nível de Urgência:</span>{' '}
                        {service.urgencyLevel}
                    </p>
                    <p>
                        <span className='font-bold'>Descrição:</span>{' '}
                        {service.description}
                    </p>

                    <div className='mt-2 flex justify-between'>
                        <Button
                            onClick={() =>
                                router.push(
                                    `/ServicesOptions/Senior-Controller/Edit-Contract-Senior/${service.id}`
                                )
                            }
                        >
                            Editar contrato
                        </Button>
                        <Button
                            onClick={() =>
                                router.push(
                                    `/ServicesOptions/Senior-Controller/Controller-myService/${service.id}`
                                )
                            }
                        >
                            Ver Propostas
                        </Button>
                        <Button
                            onClick={() => deleteContract(service.id)}
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Excluir contrato
                        </Button>
                    </div>
                    <hr className='my-4' />
                </div>
            ))}
        </div>
    );
};

export default SeniorProposals;
