import http from '@/http';
import ICaregiver from '@/Interface/ICaregiver';
import IUser from '@/Interface/IUser';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Feedback() {
    const { id } = useParams();
    const [caregiver, setCaregiver] = useState<IUser>();

    useEffect(() => {
        http.get(`/caregivers/${id}`).then((res) => {
            setCaregiver(res.data);
        });
    }, [id]);

    return (
        <>
            <div>
                <h1>Feedback</h1>
                <div>
                    <h2>{caregiver?.name}</h2>
                    <p>{caregiver?.email}</p>
                    <p>{caregiver?.phone}</p>
                </div>
            </div>
        </>
    );
}
