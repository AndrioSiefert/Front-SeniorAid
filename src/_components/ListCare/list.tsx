import axios from 'axios';
import { useEffect, useState } from 'react';

interface Caregiver {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export default function ListCaregivers() {
    const [caregivers, setCaregivers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/user')
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
                {caregivers.map((caregiver: Caregiver) => (
                    <p key={caregiver.id}>{caregiver.name}</p>
                ))}
            </div>
        </div>
    );
}
