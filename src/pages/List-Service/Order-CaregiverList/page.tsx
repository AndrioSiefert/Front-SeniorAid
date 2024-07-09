import ICaregiver from '@/Interface/ICaregiver';
import http from '@/http';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const OrderSenior = () => {
    const [caregivers, setCaregivers] = useState([]);

    useEffect(() => {
        http.get('caregiver')
            .then((res) => {
                setCaregivers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='p-4'>
            <h1 className='text-center text-3xl font-bold mb-4'>CUIDADORES DISPONÍVEIS</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {caregivers.map((caregiver: ICaregiver) => (
                    <div key={caregiver.id} className='bg-white rounded-lg shadow-md p-4'>
                        <Image
                            src={caregiver.photo}
                            alt='foto do cuidador'
                            width={200}
                            height={200}
                            className='rounded-full mx-auto'
                        />
                        <p className='text-lg font-semibold text-center mt-2'>{caregiver.name}</p>
                        <p className='text-sm text-gray-600 text-center'>{caregiver.phone}</p>
                        <button className='mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600'>
                            Entrar em Contato
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSenior;
