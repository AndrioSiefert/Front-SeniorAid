interface ICaregiver {
    id?: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    cpf: string;
    description: string;
    address_number: string;
    phone: string;
    cep: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    photo: string;
    userType: string;
}

export default ICaregiver;
