import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import http from '@/http';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns';

export default function SeniorService() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<ISeniorService>({
        mode: 'all',
    });
    const router = useRouter();
    const { seniorId } = useContext(LoginContext);
    const today = format(new Date(), 'yyyy-MM-dd');

    const onSubmit = async (data: ISeniorService) => {
        try {
            console.log('Enviando requisição...');
            const requestData = { ...data, seniorId: seniorId };
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
        <div className='flex min-h-screen items-center justify-center bg-gray-100 p-6'>
            <div className='w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-bold'>Formulário de Solicitação de Cuidador</h1>
                    <p className='mt-2 text-gray-600'>
                        Preencha as informações detalhadas sobre os cuidados que você precisa.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='mb-4'>
                            <label htmlFor='serviceName' className='block text-gray-700'>
                                Nome do Serviço:
                            </label>
                            <input
                                type='text'
                                id='serviceName'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                {...register('serviceName', { required: true })}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='dateService' className='block text-gray-700'>
                                Data do Serviço:
                            </label>
                            <input
                                type='date'
                                id='dateService'
                                min={today}
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                {...register('dateService', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='time' className='block text-gray-700'>
                                Hora de Início do Serviço:
                            </label>
                            <input
                                type='time'
                                id='time'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                {...register('time', { required: true })}
                            />
                        </div>

                        <div className='col-span-2 mb-4'>
                            <label htmlFor='medications' className='block text-gray-700'>
                                Medicamentos:
                            </label>
                            <textarea
                                id='medications'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                placeholder='Descreva os medicamentos, dosagem e horários...'
                                {...register('medications', { required: true })}
                            ></textarea>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='place' className='block text-gray-700'>
                                Local do Serviço:
                            </label>
                            <input
                                type='text'
                                id='place'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                {...register('place', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='description' className='block text-gray-700'>
                                Motivo do Serviço:
                            </label>
                            <textarea
                                id='description'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                placeholder='Descreva o motivo do serviço (passear, cuidado em casa, etc.)'
                                {...register('description', { required: true })}
                            ></textarea>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='price' className='block text-gray-700'>
                                Valor a Ser Pago:
                            </label>
                            <NumericFormat
                                id='price'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                placeholder='Digite o valor a ser pago...'
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix='R$ '
                                decimalScale={2}
                                fixedDecimalScale
                                allowNegative={false}
                                onValueChange={(values) => {
                                    setValue('price', values.floatValue ? values.floatValue.toString() : '');
                                }}
                                {...register('price', {
                                    required: 'Valor a ser pago é obrigatório',
                                    min: {
                                        value: 20,
                                        message: 'O valor mínimo é R$ 20,00',
                                    },
                                })}
                            />
                            {errors.price && <p className='text-sm text-red-500'>{errors.price.message}</p>}
                        </div>
                    </div>
                    <div className='text-center'>
                        <Button
                            type='submit'
                            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
