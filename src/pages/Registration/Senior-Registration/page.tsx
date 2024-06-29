import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/_components/ErrorMessage/error';

export default function CadastroSenior() {
    const {
        register,
        setError,
        setValue,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ISenior>({
        mode: 'all'
    });

    const cepDigitado = watch('cep');

    const fetchEndereco = async (cep: string) => {
        if (!cep) {
            setError('cep', {
                type: 'manual',
                message: 'Esse CEP é invalido'
            });
            return;
        }
        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );
            const data = await response.json();

            if (response.ok) {
                setValue('street', data.logradouro);
                setValue('neighborhood', data.bairro);
                setValue('city', data.localidade);
                setValue('state', data.uf);
            } else {
                throw new Error('CEP não encontrado');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: ISenior) => {
        http.post('senior', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center register'>
            <div className='p-4'>
                <h1 className='text-2xl font-bold text-center'>
                    CADASTRO SENIOR
                </h1>
            </div>

            <div className='flex items-center justify-center w-full'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full max-w-md form p-6 rounded-lg shadow-lg'
                >
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Nome:
                    </label>
                    <input
                        className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
                        id='name'
                        type='text'
                        placeholder='Nome'
                        {...register('name')}
                    />

                    <label
                        htmlFor='cpf'
                        className='block text-sm font-medium text-gray-700 mt-4'
                    >
                        CPF:
                    </label>
                    <input
                        className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
                        id='cpf'
                        type='text'
                        placeholder='CPF'
                        {...register('cpf')}
                    />

                    <label
                        htmlFor='age'
                        className='block text-sm font-medium text-gray-700 mt-4'
                    >
                        Idade
                    </label>
                    <input
                        className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
                        id='age'
                        type='text'
                        placeholder='Idade'
                        {...register('age')}
                    />

                    <label htmlFor='cep' className='block mt-4'>
                        CEP:
                    </label>
                    <input
                        id='cep'
                        type='text'
                        className={`block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.cep ? 'border-red-500' : ''
                        }`}
                        placeholder='Digite o CEP'
                        {...register('cep', {
                            required: 'CEP é obrigatório'
                        })}
                        onBlur={(e) => {
                            fetchEndereco(cepDigitado);
                        }}
                    />
                    {errors.cep && (
                        <ErrorMessage>{errors.cep.message}</ErrorMessage>
                    )}
                    <label htmlFor='street' className='block mt-4'>
                        Rua:
                    </label>
                    <input
                        id='street'
                        type='text'
                        className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Digite a rua'
                        {...register('street')}
                    />
                    <label htmlFor='neighborhood' className='block mt-4'>
                        Bairro:
                    </label>
                    <input
                        id='neighborhood'
                        type='text'
                        className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Digite o bairro'
                        {...register('neighborhood')}
                    />
                    <label htmlFor='city' className='block mt-4'>
                        Cidade:
                    </label>
                    <input
                        id='city'
                        type='text'
                        className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Digite a cidade'
                        {...register('city')}
                    />
                    <label htmlFor='state' className='block mt-4'>
                        Estado:
                    </label>
                    <input
                        id='state'
                        type='text'
                        className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Digite o estado'
                        {...register('state')}
                    />
                    <label htmlFor='address_number' className='block mt-4'>
                        Número da Casa:
                    </label>
                    <input
                        id='address_number'
                        type='text'
                        className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Digite o número da casa'
                        {...register('address_number')}
                    />

                    <input
                        type='hidden'
                        value='senior'
                        {...register('userType')}
                    />

                    <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700 mt-4'
                    >
                        Telefone:
                    </label>
                    <input
                        className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
                        id='phone'
                        type='text'
                        placeholder='Telefone'
                        {...register('phone')}
                    />

                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mt-4'
                    >
                        Email:
                    </label>
                    <input
                        className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
                        id='email'
                        type='text'
                        placeholder='E-mail'
                        {...register('email')}
                    />

                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700 mt-4'
                    >
                        Senha:
                    </label>
                    <input
                        className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
                        id='password'
                        type='text'
                        placeholder='Senha'
                        {...register('password')}
                    />

                    <div className='flex justify-center items-center mt-6'>
                        <Button className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
