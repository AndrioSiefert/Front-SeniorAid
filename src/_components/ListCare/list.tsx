import ICaregiver from '@/Interface/ICaregiver';
import http from '@/http';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ListCaregivers() {
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
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Cuidadores</h1>
            <div>
                {caregivers.map((caregiver: ICaregiver) => (
                    <div key={caregiver.id} className='flex items-center my-4'>
                        <p>{caregiver.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
