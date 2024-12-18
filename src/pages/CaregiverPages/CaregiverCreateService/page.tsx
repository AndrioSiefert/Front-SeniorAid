import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import http from '@/http';
import { LoginContext } from '@/context/LoginContext';
import ICaregiverService from '@/Interface/ICaregiver-Service';
import { Button } from '@/components/ui/button';

export default function CreateCaregiverService() {
    const { handleSubmit, register } = useForm<ICaregiverService>({
        mode: 'all',
    });

    const { caregiverId } = useContext(LoginContext);
    const [price, setPrice] = React.useState<string>('');

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

        // Remove qualquer caractere que não seja número ou ponto decimal
        inputValue = inputValue.replace(/[^\d.]/g, '');

        // Formata o valor com o símbolo $
        const formattedValue = `R$${inputValue}`;

        setPrice(formattedValue);
    };

    const onSubmit = async (data: ICaregiverService) => {
        console.log('Dados enviados:', data);
        try {
            const requestData = { ...data, caregiverId: caregiverId };
            console.log('Dados da requisição:', requestData);
            const response = await http.post('caregiver-service', requestData);
            console.log('Resposta do servidor:', response);
            alert('Serviço de cuidador criado com sucesso!');
        } catch (error: any) {
            console.error('Erro ao criar serviço de cuidador:', error);
            if (error.response && error.response.status === 400) {
                alert('Já existe um serviço de cuidador criado para este usuário.');
            } else {
                alert('Erro ao criar serviço de cuidador!');
            }
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 p-6'>
            <div className='w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-bold'>Crie sua oferta de serviço de cuidador</h1>
                    <p className='mt-2 text-gray-600'>
                        Preencha as informações detalhadas sobre o serviço que você deseja oferecer.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='mb-4'>
                            <label htmlFor='preference' className='block text-gray-700'>
                                Preferencia do Cuidador:
                            </label>
                            <div className='mt-2'>
                                <div>
                                    <input
                                        type='radio'
                                        id='preference-viagens'
                                        value='Viagens'
                                        {...register('preference')}
                                    />
                                    <label htmlFor='preference-viagens' className='ml-2'>
                                        Viagens
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        id='preference-passeios'
                                        value='Passeios'
                                        {...register('preference')}
                                    />
                                    <label htmlFor='preference-passeios' className='ml-2'>
                                        Passeios
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        id='preference-hospital'
                                        value='Passar a noite no hospital'
                                        {...register('preference')}
                                    />
                                    <label htmlFor='preference-hospital' className='ml-2'>
                                        Passar a noite no hospital
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        id='preference-casa'
                                        value='Cuidar do idoso em casa'
                                        {...register('preference')}
                                    />
                                    <label htmlFor='preference-casa' className='ml-2'>
                                        Cuidar do idoso em casa
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type='radio'
                                        id='preference-outros'
                                        value='Outros'
                                        {...register('preference')}
                                    />
                                    <label htmlFor='preference-outros' className='ml-2'>
                                        Outros
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='about' className='block text-gray-700'>
                                Sobre Mim:
                            </label>
                            <textarea
                                id='about'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                {...register('about', { required: true })}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='experience' className='block text-gray-700'>
                                Experiência:
                            </label>
                            <input
                                type='text'
                                id='experience'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                {...register('experience')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='price' className='block text-gray-700'>
                                Preço:
                            </label>
                            <input
                                type='text'
                                id='price'
                                placeholder='$'
                                className='w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                                value={price}
                                {...register('price', { required: true })}
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>

                    <div className='text-center'>
                        <Button
                            type='submit'
                            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                        >
                            Criar Serviço de Cuidador
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
