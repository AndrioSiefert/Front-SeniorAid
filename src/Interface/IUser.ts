interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    cpf: string;
    age: number;
    gender: 'man' | 'woman';
    phone: string;
    description: string;
    address_number: string;
    cep: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    photo: string;
    user_type: string;
}
export default IUser;
