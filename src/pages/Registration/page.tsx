import IUser from '@/Interface/IUser';
import ErrorMessage from '@/components/ErrorMessage/error';
import http from '@/http';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from '@/components/Mask/mask';
import { Button } from '@/components/ui/button';

export default function Registration() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<IUser>({
        mode: 'all',
    });
    const router = useRouter();
    const senha = watch('password');
    const cepDigitado = watch('cep');
    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [image, setImage] = useState('');

    const hanldeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const validaSenha = {
        obrigatorio: (e: string) => !!e || 'Por favor, preencha este campo novamente',
        tamanhoMinimo: (e: string) => e.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
        senhaIgual: (e: string) => e === senha || 'As senhas não são iguais',
    };

    const fetchEndereco = async (cep: string) => {
        if (!cep) {
            setError('cep', {
                type: 'manual',
                message: 'CEP é invalido',
            });
            return;
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
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

    const onSubmit = async (data: IUser) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (image) {
            const blob = await fetch(image).then((r) => r.blob());
            console.log('Blob da imagem:', blob);
            formData.append('photo', blob, 'image.jpg');
        }

        try {
            const response = await http.post('user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            router.push('/Login/page');
        } catch (error) {
            console.log(error);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value.length > 0) {
            value = value[0].toUpperCase() + value.slice(1);
        }
        setName(value);
    };

    // ARRUMAR LOGICA DO CAMPO DE DATA DE NASCIMENTO
    const getDataNascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value.length === 2 || value.length === 5) {
            value += '/';
        }
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        if (value.length === 10) {
            let data = value.split('/');
            let dia = parseInt(data[0]);
            let mes = parseInt(data[1]);
            let ano = parseInt(data[2]);
            if (dia > 31 || dia < 1) {
                value = '';
            }
            if (mes > 12 || mes < 1) {
                value = '';
            }
            if (ano < 1900 || ano > 2021) {
                value = '';
            }
            if (value === '') {
                setError('age', {
                    type: 'manual',
                    message: 'Data de nascimento inválida',
                });
            }
        }
        setDataNascimento(value);
    };

    return (
        <div className='flex justify-center bg-gray-100 py-10'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='grid w-full max-w-4xl grid-cols-1 gap-6 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-2'
            >
                <div className='mb-4'>
                    <label htmlFor='name' className='text-sm font-medium text-gray-700'>
                        Nome:
                    </label>
                    <input
                        id='name'
                        type='text'
                        className={`mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${
                            errors.name ? 'border-red-500' : ''
                        }`}
                        placeholder='Digite seu nome'
                        {...register('name', {
                            required: 'O nome é obrigatório',
                        })}
                        value={name}
                        onChange={handleNameChange}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    <label htmlFor='email' className='text-white-600 mt-4 block text-lg'>
                        E-mail:
                    </label>
                    <input
                        id='email'
                        type='email'
                        className={`mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder='Digite seu e-mail'
                        {...register('email', {
                            required: 'Email obrigatório',
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    <label htmlFor='password' className='mt-4 block'>
                        Senha:
                    </label>
                    <input
                        id='password'
                        type='password'
                        className={`mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${
                            errors.password ? 'border-red-500' : ''
                        }`}
                        placeholder='Digite uma senha'
                        {...register('password', {
                            required: 'Senha obrigatória',
                            minLength: {
                                value: 6,
                                message: 'Senha deve ter no mínimo 6 caracteres',
                            },
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    <label htmlFor='password_confirmation' className='mt-4 block'>
                        Confirme sua Senha:
                    </label>
                    <input
                        id='password_confirmation'
                        type='password'
                        className={`mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${
                            errors.password_confirmation ? 'border-red-500' : ''
                        }`}
                        placeholder='Repita a senha'
                        {...register('password_confirmation', {
                            required: 'Repita a senha',
                            validate: validaSenha,
                        })}
                    />
                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                    <label htmlFor='cpf' className='mt-4 block px-2'>
                        CPF:
                    </label>
                    <input
                        id='cpf'
                        type='text'
                        maxLength={11}
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite seu CPF'
                        {...register('cpf')}
                    />
                    <label htmlFor='age' className='mt-4 block'>
                        Data de Nascimento:
                    </label>
                    <input
                        id='age'
                        type='text'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite sua data de nascimento'
                        {...register('age')}
                        value={dataNascimento}
                        onChange={getDataNascimento}
                    />
                    {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}

                    <label htmlFor='gender' className='mt-4 block'>
                        Gênero:
                    </label>
                    <select
                        id='gender'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        {...register('gender')}
                        required
                    >
                        <option value='' disabled hidden>
                            Selecione o gênero
                        </option>
                        <option value='man'>Masculino</option>
                        <option value='woman'>Feminino</option>
                    </select>

                    {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
                </div>

                <div className='mb-4'>
                    <label htmlFor='cep' className='text-sm font-medium text-gray-700'>
                        CEP:
                    </label>
                    <input
                        id='cep'
                        type='text'
                        className={`mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${
                            errors.cep ? 'border-red-500' : ''
                        }`}
                        placeholder='Digite o CEP'
                        {...register('cep', {
                            required: 'CEP é obrigatório',
                        })}
                        onBlur={(e) => {
                            fetchEndereco(cepDigitado);
                        }}
                    />
                    {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
                    <label htmlFor='street' className='mt-4 block'>
                        Rua:
                    </label>
                    <input
                        id='street'
                        type='text'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite a rua'
                        {...register('street')}
                    />
                    <label htmlFor='neighborhood' className='mt-4 block'>
                        Bairro:
                    </label>
                    <input
                        id='neighborhood'
                        type='text'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite o bairro'
                        {...register('neighborhood')}
                    />
                    <label htmlFor='city' className='mt-4 block'>
                        Cidade:
                    </label>
                    <input
                        id='city'
                        type='text'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite a cidade'
                        {...register('city')}
                    />
                    <label htmlFor='state' className='mt-4 block'>
                        Estado:
                    </label>
                    <input
                        id='state'
                        type='text'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite o estado'
                        {...register('state')}
                    />
                    <label htmlFor='address_number' className='mt-4 block'>
                        Número da Casa:
                    </label>
                    <input
                        id='address_number'
                        type='text'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        placeholder='Digite o número da casa'
                        {...register('address_number')}
                    />

                    <label htmlFor='user_type' className='mt-4 block'>
                        Tipo de Usuário:
                    </label>
                    <select
                        id='user_type'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        {...register('user_type')}
                    >
                        <option value='caregiver'>Cuidador</option>
                        <option value='senior'>Idoso</option>
                    </select>

                    <label htmlFor='photo' className='mt-4 block'>
                        Foto:
                    </label>
                    <input
                        id='photo'
                        type='file'
                        className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                        onChange={hanldeImageChange}
                    />
                    <Controller
                        control={control}
                        name='phone'
                        rules={{
                            pattern: {
                                value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
                                message: 'Telefone inválido',
                            },
                            required: 'Telefone é obrigatório',
                        }}
                        render={({ field }) => (
                            <>
                                <label htmlFor=''>Telefone</label>
                                <InputMask
                                    className='mt-1 block w-full rounded-full border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                                    mask='(99) 99999-9999'
                                    placeholder='Digite seu telefone'
                                    $error={!!errors.phone}
                                    onChange={field.onChange}
                                />
                                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                            </>
                        )}
                    />
                </div>
                <div className=''>
                    <Button
                        type='submit'
                        className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                    >
                        Criar Conta
                    </Button>
                </div>
            </form>
        </div>
    );
}
