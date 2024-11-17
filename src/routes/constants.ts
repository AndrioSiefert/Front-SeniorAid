export const routes = {
    profilePath: (userType: string, userId: number | null) =>
        `/${
            userType === 'senior' ? 'Senior-Controller/SeniorProfile' : 'Caregiver-Controller/CaregiverProfile'
        }/${userId}`,
    myServices: (userType: string, seniorId: number | null, caregiverId: number | null) =>
        `/${
            userType === 'senior'
                ? `Senior-Controller/SeniorServiceCreated/${seniorId}`
                : `Caregiver-Controller/CaregiverServicesCreated/${caregiverId}`
        }`,
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
