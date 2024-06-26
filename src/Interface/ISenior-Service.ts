interface ISeniorService {
    id?: number;
    serviceType: string;
    dateService: Date;
    startTime: string;
    endTime: string;
    medication: string;
    location: string;
    description: string;
    price: string;
    urgencyLevel: string;
    senior: ISenior;
}

export default ISeniorService;
