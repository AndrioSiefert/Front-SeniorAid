import ICaregiver from './ICaregiver';
import ISeniorService from './ISenior-Service';

interface IServiceRequest {
    id: number;
    caregiver: ICaregiver;
    service: ISeniorService;
    accepted: boolean;
}

export default IServiceRequest;
