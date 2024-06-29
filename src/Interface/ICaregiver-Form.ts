import ICaregiver from './ICaregiver';

interface ICaregiverServiceForm {
    qualification: string;
    skills: string;
    aboutMe: string;
    experience?: string;
    languages?: string;
    description: string;
    price: number;
    caregiver: ICaregiver;
}

export default ICaregiverServiceForm;