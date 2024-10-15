interface IJwtPayload {
    id: number;
    name: string;
    userType: string;
    caregiverId?: number;
    seniorId?: number;
}

export default IJwtPayload;
