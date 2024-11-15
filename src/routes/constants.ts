export const routes = {
    profilePath: (userType: string, userId: number | null) =>
        `/${
            userType === 'senior' ? 'Senior-Controller/SeniorProfile' : 'Caregiver-Controller/CaregiverProfile'
        }/${userId}`,
    myServices: (userType: string, userId: number | null) =>
        `/${
            userType === 'senior'
                ? 'Senior-Controller/SeniorServiceCreated/'
                : 'Caregiver-Controller/CaregiverServicesCreated/'
        }/${userId}`,
    createService: (userType: string) =>
        `/${
            userType === 'senior'
                ? 'Senior-Controller/SeniorCreateService/page'
                : 'Caregiver-Controller/CaregiverCreateService/page'
        }`,
    listService: (userType: string) =>
        `/${
            userType === 'senior'
                ? 'Services-Controller/ServiceCaregiverList/page'
                : 'Services-Controller/ServiceSeniorList/page'
        }`,
};
