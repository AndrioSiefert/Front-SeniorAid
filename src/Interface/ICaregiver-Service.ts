import ICaregiver from './ICaregiver';

interface ICaregiverService {
    id: number;
    preference: string;
    experience: string;
    about: string;
    price: number;
    caregiverId: number;
    caregiver: ICaregiver;
}

export default ICaregiverService;
