interface IJwtPayload {
    id: number;
    name: string;
    userType: string;
    caregiverId?: number;
    seniorId?: number;
    photo?: string;
}

export default IJwtPayload;
