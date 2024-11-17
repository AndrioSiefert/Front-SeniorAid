export const routes = {
    profilePath: (userType: string, userId: number | null) =>
        `/${
            userType === 'senior' ? 'SeniorPages/Senior-Controller/SeniorProfile' : 'CaregiverPages/CaregiverProfile'
        }/${userId}`,
    myServices: (userType: string, seniorId: number | null, caregiverId: number | null) =>
        `/${
            userType === 'senior'
                ? `SeniorPages/SeniorServiceCreated/${seniorId}`
                : `CaregiverPages/CaregiverServicesCreated/${caregiverId}`
        }`,
    createService: (userType: string) =>
        `/${
            userType === 'senior'
                ? 'SeniorPages/SeniorCreateService/page'
                : 'CaregiverPages/CaregiverCreateService/page'
        }`,
    listService: (userType: string) =>
        `/${userType === 'senior' ? 'List/ServiceToSenior/page' : 'List/ServiceToCaregiver/page'}`,
};
