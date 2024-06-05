import axios from 'axios';
import React, { useEffect } from 'react';

export default function CaregiverRequestForm() {
    useEffect(() => {
        axios.get('https://api.example.com/caregivers').then((response) => {
            console.log(response.data);
        });
    }, []);

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
                <form action='' method='POST'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='mb-4'>
                            <label
                                htmlFor='name'
                                className='block text-gray-700'
                            >
                                Tipo da Solicitação:
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='email'
                                className='block text-gray-700'
                            >
                                E-mail:
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='phone'
                                className='block text-gray-700'
                            >
                                Telefone:
                            </label>
                            <input
                                type='tel'
                                id='phone'
                                name='phone'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='date'
                                className='block text-gray-700'
                            >
                                Data do Serviço:
                            </label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='time'
                                className='block text-gray-700'
                            >
                                Hora do Serviço:
                            </label>
                            <input
                                type='time'
                                id='time'
                                name='time'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='serviceReason'
                                className='block text-gray-700'
                            >
                                Motivo do Serviço:
                            </label>
                            <textarea
                                id='serviceReason'
                                name='serviceReason'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Descreva o motivo do serviço (passear, cuidado em casa, etc.)'
                                required
                            ></textarea>
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='careType'
                                className='block text-gray-700'
                            >
                                Tipos de Cuidados:
                            </label>
                            <textarea
                                id='careType'
                                name='careType'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Descreva os tipos de cuidados (medicamentos, etc.)'
                                required
                            ></textarea>
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='payment'
                                className='block text-gray-700'
                            >
                                Valor a Ser Pago:
                            </label>
                            <input
                                type='number'
                                id='payment'
                                name='payment'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Digite o valor a ser pago...'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='days'
                                className='block text-gray-700'
                            >
                                Quantos Dias por Semana:
                            </label>
                            <input
                                type='number'
                                id='days'
                                name='days'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Digite o número de dias por semana...'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='hours'
                                className='block text-gray-700'
                            >
                                Quantas Horas por Dia:
                            </label>
                            <input
                                type='number'
                                id='hours'
                                name='hours'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Digite o número de horas por dia...'
                                required
                            />
                        </div>
                        <div className='mb-4 col-span-2'>
                            <label
                                htmlFor='medications'
                                className='block text-gray-700'
                            >
                                Medicamentos:
                            </label>
                            <textarea
                                id='medications'
                                name='medications'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Descreva os medicamentos, dosagem e horários...'
                                required
                            ></textarea>
                        </div>
                        <div className='mb-4 col-span-2'>
                            <label
                                htmlFor='additionalInfo'
                                className='block text-gray-700'
                            >
                                Informações Adicionais:
                            </label>
                            <textarea
                                id='additionalInfo'
                                name='additionalInfo'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                placeholder='Descreva qualquer outra informação importante...'
                            ></textarea>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
