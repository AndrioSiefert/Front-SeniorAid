import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import http from '@/http';
import { LoginContext } from '@/context/LoginContext';
import ICaregiverService from '@/Interface/ICaregiver-Service';
import { Button } from '@/_components/ui/button';

export default function CreateCaregiverService() {
    const { handleSubmit, register } = useForm<ICaregiverService>({
        mode: 'all'
    });

    const { userId } = useContext(LoginContext);
    console.log('User ID:', userId);

    const onSubmit = async (data: ICaregiverService) => {
        console.log('Dados enviados:', data);
        try {
            const requestData = { ...data, caregiverId: userId };
            console.log('Dados da requisição:', requestData);
            const response = await http.post('caregiver-service', requestData);
            console.log('Resposta do servidor:', response);
            alert('Serviço de cuidador criado com sucesso!');
        } catch (error: any) {
            console.error('Erro ao criar serviço de cuidador:', error);
            if (error.response && error.response.status === 400) {
                alert(
                    'Já existe um serviço de cuidador criado para este usuário.'
                );
            } else {
                alert('Erro ao criar serviço de cuidador!');
            }
        }
    };

    return (
        <div className='bg-gray-100 flex items-center justify-center min-h-screen p-6'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl'>
                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-bold'>
                        Crie sua oferta de serviço de cuidador
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        Preencha as informações detalhadas sobre o serviço que
                        você deseja oferecer.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='mb-4'>
                            <label
                                htmlFor='qualification'
                                className='block text-gray-700'
                            >
                                Qualificação:
                            </label>
                            <input
                                type='text'
                                id='qualification'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('qualification', {
                                    required: true
                                })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='skills'
                                className='block text-gray-700'
                            >
                                Habilidades:
                            </label>
                            <input
                                type='text'
                                id='skills'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('skills', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='aboutMe'
                                className='block text-gray-700'
                            >
                                Sobre Mim:
                            </label>
                            <textarea
                                id='aboutMe'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('aboutMe', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='experience'
                                className='block text-gray-700'
                            >
                                Experiência:
                            </label>
                            <input
                                type='text'
                                id='experience'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('experience')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='languages'
                                className='block text-gray-700'
                            >
                                Idiomas:
                            </label>
                            <input
                                type='text'
                                id='languages'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('languages')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='description'
                                className='block text-gray-700'
                            >
                                Descrição:
                            </label>
                            <textarea
                                id='description'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('description', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label
                                htmlFor='price'
                                className='block text-gray-700'
                            >
                                Preço:
                            </label>
                            <input
                                type='number'
                                id='price'
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                                {...register('price', { required: true })}
                            />
                        </div>
                    </div>

                    <div className='text-center'>
                        <Button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Criar Serviço de Cuidador
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
