import ISenior from './ISenior';

interface ISeniorService {
    id?: number;
    serviceType: string;
    dateService: string;
    time: string;
    medications: string;
    location: string;
    description: string;
    price: string;
    urgencyLevel: string;
    seniorId: string;
    senior: ISenior;
}

export default ISeniorService;
