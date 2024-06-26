import { Button } from '@/_components/ui/button';
import Link from 'next/link';

export default function LoginSelect() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg'>
                <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
                    Login
                </h1>
                <div className='space-y-4'>
                    <Link href='/Login/Login-Senior/page'>
                        <Button className='w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200'>
                            Login como Senior
                        </Button>
                    </Link>
                    <Link href='/Login/Login-Caregiver/page'>
                        <Button className='w-full py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200'>
                            Login como Caregiver
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
