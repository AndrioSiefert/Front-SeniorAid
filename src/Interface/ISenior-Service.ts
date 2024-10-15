import ISenior from './ISenior';

interface ISeniorService {
    id?: number;
    serviceName: string;
    dateService: string;
    time: string;
    medications: string;
    place: string;
    description: string;
    price: string;
    seniorId: number;
    senior: ISenior;
}

export default ISeniorService;
