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
    seniorId: string;
    senior: ISenior;
}

export default ISeniorService;
