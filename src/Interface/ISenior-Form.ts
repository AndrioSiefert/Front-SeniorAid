interface ISeniorForm {
    serviceType: string;
    dateService: string;
    startTime: string;
    endTime: string;
    medications: string;
    location: string;
    description: string;
    price: string;
    urgencyLevel?: 'baixa' | 'média' | 'alta'; // Define um dos três valores específicos
}

export default ISeniorForm;
