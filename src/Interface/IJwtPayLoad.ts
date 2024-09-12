interface IJwtPayload {
    id: number;
    name: string;
    userType: string;
    exp?: number | undefined;
}

export default IJwtPayload;
