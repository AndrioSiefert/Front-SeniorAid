import http from '@/http';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProfileSenior = () => {
    const router = useRouter();
    const { id } = router.query;
    const [senior, setSenior] = useState<ISenior | null>(null);
    useEffect(() => {
        const fetchSenior = async () => {
            const response = await http.get(`/senior/${id}`);
            setSenior(response.data);
        };
        fetchSenior();
    }, [id]);

    return (
        <div>
            <h1>ProfileSenior</h1>
            {senior && (
                <div>
                    <h2>{senior.name}</h2>
                    <p>{senior.description}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileSenior;
