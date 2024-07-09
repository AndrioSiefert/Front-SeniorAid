import ICaregiver from './ICaregiver';

interface ICaregiverService {
    id: number;
    qualification: string;
    skills: string;
    aboutMe: string;
    experience?: string;
    languages?: string;
    description: string;
    price: number;
    caregiverId: ICaregiver;
}

export default ICaregiverService;
