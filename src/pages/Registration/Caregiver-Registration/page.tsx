import ICaregiver from '@/Interface/ICaregiver';
import ErrorMessage from '@/_components/ErrorMessage/error';
import InputMask from '@/_components/Mask/mask';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useForm, Controller } from 'react-hook-form';

export default function CadastroCuidador() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm<ICaregiver>({
        mode: 'all'
    });

    const senha = watch('password');
    const cepDigitado = watch('cep');

    const validaSenha = {
        obrigatorio: (e: string) =>
            !!e || 'Por favor, preencha este campo novamente',
        tamanhoMinimo: (e: string) =>
            e.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
        senhaIgual: (e: string) => e === senha || 'As senhas não são iguais'
    };

    const fetchEndereco = async (cep: string) => {
        if (!cep) {
            setError('cep', {
                type: 'manual',
                message: 'CEP é invalido'
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

    const onSubmit = async (data: ICaregiver) => {
        http.post('caregiver', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='flex items-start justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-96 bg-gradient-to-b from-blue-200 to-blue-500 p-8 rounded-3xl shadow-lg'
            >
                <label
                    htmlFor='name'
                    className='block text-lg font-bold text-white-600'
                    style={{ textShadow: '0 2px 0 rgba(255, 255, 255, 0.5)' }}
                >
                    Nome:
                </label>
                <input
                    id='name'
                    type='text'
                    className={`block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder='Digite seu nome'
                    {...register('name', { required: 'O nome é obrigatório' })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}

                <label
                    htmlFor='email'
                    className='block mt-4 text-lg font-bold text-white-600'
                    style={{ textShadow: '0 2px 0 rgba(255, 255, 255, 0.5)' }}
                >
                    E-mail:
                </label>
                <input
                    id='email'
                    type='email'
                    className={`block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  ${
                        errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder='Digite seu e-mail'
                    {...register('email', { required: 'Email obrigatório' })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
                <label htmlFor='password' className='block mt-4'>
                    Senha:
                </label>
                <input
                    id='password'
                    type='password'
                    className={`block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder='Digite uma senha'
                    {...register('password', {
                        required: 'Senha obrigatória',
                        minLength: {
                            value: 6,
                            message: 'Senha deve ter no mínimo 6 caracteres'
                        }
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                <label htmlFor='password_confirmation' className='block mt-4'>
                    Confirmação de Senha:
                </label>
                <input
                    id='password_confirmation'
                    type='password'
                    className={`block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.password_confirmation ? 'border-red-500' : ''
                    }`}
                    placeholder='Repita a senha'
                    {...register('password_confirmation', {
                        required: 'Repita a senha',
                        validate: validaSenha
                    })}
                />
                {errors.password_confirmation && (
                    <ErrorMessage>
                        {errors.password_confirmation.message}
                    </ErrorMessage>
                )}

                <label htmlFor='cpf' className='block mt-4 px-2'>
                    CPF:
                </label>
                <input
                    id='cpf'
                    type='text'
                    maxLength={11}
                    className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Digite seu CPF'
                    {...register('cpf')}
                />
                <label htmlFor='description' className='block mt-4'>
                    Descrição:
                </label>
                <textarea
                    id='description'
                    className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Digite uma descrição sobre você'
                    {...register('description')}
                ></textarea>
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
                    value='caregiver'
                    {...register('userType')}
                />

                <label htmlFor='photo' className='block mt-4'>
                    Foto:
                </label>
                <input
                    id='photo'
                    type='text'
                    className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Coloque uma foto sua'
                    {...register('photo')}
                />
                <Controller
                    control={control}
                    name='phone'
                    rules={{
                        pattern: {
                            value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
                            message: 'Telefone inválido'
                        },
                        required: 'Telefone é obrigatório'
                    }}
                    render={({ field }) => (
                        <>
                            <label htmlFor=''>Telefone</label>
                            <InputMask
                                className='block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                mask='(99) 99999-9999'
                                placeholder='Digite seu telefone'
                                $error={!!errors.phone}
                                onChange={field.onChange}
                            />
                            {errors.phone && (
                                <ErrorMessage>
                                    {errors.phone.message}
                                </ErrorMessage>
                            )}
                        </>
                    )}
                />
                <Button
                    type='submit'
                    className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Criar Conta
                </Button>
            </form>
        </div>
    );
}
