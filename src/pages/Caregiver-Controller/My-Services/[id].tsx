import React, { useContext, useEffect, useState } from 'react';
import http from '@/http';
import { useRouter } from 'next/router';
import { Button } from '@/_components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import ICaregiverServiceForm from '@/Interface/ICaregiver-Service';

const CaregiverProposals = () => {
    const router = useRouter();
    const [caregiverService, setCaregiverService] = useState<ICaregiverServiceForm | null>(null);
    const { userId } = useContext(LoginContext);

    useEffect(() => {
        if (userId) {
            http.get(`/caregiver-service/${userId}`)
                .then((response) => {
                    setCaregiverService(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviço do cuidador', error);
                });
        }
    }, [userId]);

    const deleteContract = (id: number | undefined) => {
        if (id) {
            http.delete(`/caregiver-service/${id}`)
                .then(() => {
                    console.log(`Contrato ${id} excluído com sucesso.`);
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Erro ao excluir contrato:', error);
                });
        }
    };

    if (!caregiverService) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1>Nenhum serviço encontrado</h1>
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto mt-8 p-8 border rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Detalhes do Serviço do Cuidador</h1>

            <p>
                <span className='font-bold'>Qualificação:</span> {caregiverService.preference}
            </p>
            <p>
                <span className='font-bold'>Habilidades:</span> {caregiverService.experience}
            </p>
            <p>
                <span className='font-bold'>Sobre Mim:</span> {caregiverService.about}
            </p>
            <p>
                <span className='font-bold'>Experiência:</span> {caregiverService.experience}
            </p>
            <p>
                <span className='font-bold'>Preço:</span> {caregiverService.price}
            </p>

            <div className='mt-8 flex justify-between'>
                {/* <Button
                    onClick={() => router.push(`/Caregiver-Controller/Edit-Contract-Caregiver/${caregiverService.id}`)}
                >
                    Editar contrato
                </Button> */}
                {/* <Button onClick={() => router.push(`/Caregiver-Controller/My-Services/${caregiverService.id}`)}>
                    Ver Propostas
                </Button> */}
                <Button
                    onClick={() => deleteContract(caregiverService.id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                >
                    Excluir contrato
                </Button>
            </div>
        </div>
    );
};

export default CaregiverProposals;
