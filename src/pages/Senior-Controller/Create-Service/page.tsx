import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/_components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import http from '@/http';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

export default function SeniorService() {
    const { handleSubmit, register } = useForm<ISeniorService>({
        mode: 'all'
    });

    const router = useRouter();
    const { userId } = useContext(LoginContext);

    const onSubmit = async (data: ISeniorService) => {
        try {
            console.log('Enviando requisição...');
            const requestData = { ...data, seniorId: userId };
            const response = await http.post('seniorService', requestData);
            router.push('/');
            console.log('Resposta do servidor:', response);
            alert('Serviço criado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a solicitação:', error);
            alert('Erro ao enviar a solicitação!');
        }
    };
    return (
        <div className='bg-gray-100 flex items-center justify-center min-h-screen p-6'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl'>
                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-bold'>
                        Formulário de Solicitação de Cuidador
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        Preencha as informações detalhadas sobre os cuidados que
                        você precisa.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='mb-4'>
                            <label
                                htmlFor='serviceType'
                                className='block text-gray-700'
                            >
                                Tipo da Solicitação:
                            </label>
                            <input
                                type='text'
                                id='serviceType'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('serviceType', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='dateService'
                                className='block text-gray-700'
                            >
                                Data do Serviço:
                            </label>
                            <input
                                type='date'
                                id='dateService'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('dateService', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='time'
                                className='block text-gray-700'
                            >
                                Hora de Início do Serviço:
                            </label>
                            <input
                                type='time'
                                id='time'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('time', { required: true })}
                            />
                        </div>

                        <div className='mb-4 col-span-2'>
                            <label
                                htmlFor='medication'
                                className='block text-gray-700'
                            >
                                Medicamentos:
                            </label>
                            <textarea
                                id='medication'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Descreva os medicamentos, dosagem e horários...'
                                {...register('medications', { required: true })}
                            ></textarea>
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='location'
                                className='block text-gray-700'
                            >
                                Local do Serviço:
                            </label>
                            <input
                                type='text'
                                id='location'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('location', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='description'
                                className='block text-gray-700'
                            >
                                Motivo do Serviço:
                            </label>
                            <textarea
                                id='description'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Descreva o motivo do serviço (passear, cuidado em casa, etc.)'
                                {...register('description', { required: true })}
                            ></textarea>
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='price'
                                className='block text-gray-700'
                            >
                                Valor a Ser Pago:
                            </label>
                            <input
                                type='number'
                                id='price'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Digite o valor a ser pago...'
                                {...register('price', { required: true })}
                            />
                        </div>

                        <div className='mb-4 col-span-2'>
                            <label
                                htmlFor='urgencyLevel'
                                className='block text-gray-700'
                            >
                                Nível de Urgência:
                            </label>
                            <input
                                type='text'
                                id='urgencyLevel'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Digite o nível de urgência...'
                                {...register('urgencyLevel', {
                                    required: true
                                })}
                            />
                        </div>
                    </div>
                    <div className='text-center'>
                        <Button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
