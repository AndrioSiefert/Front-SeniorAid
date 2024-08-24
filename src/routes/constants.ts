export const routes = {
    profilePath: (userType: string, userId: number | null) =>
        `/Profile/${
            userType === 'senior' ? 'Profile-Senior' : 'Profile-Caregiver'
        }/${userId}`,
    myServices: (userType: string, userId: number | null) =>
        `/ServicesOptions/${
            userType === 'senior'
                ? 'Senior-Controller/List-Service'
                : 'Caregiver-Controller/MyServices'
        }/${userId}`,
    createService: (userType: string) =>
        `/ServicesOptions/${
            userType === 'senior'
                ? 'Senior-Controller/Create-Senior-Service/page'
                : 'Caregiver-Controller/Create-Caregiver-Service/page'
        }`,
    listService: (userType: string) =>
        `/List-Service/${
            userType === 'senior'
                ? 'Order-CaregiverList/page'
                : 'Order-SeniorList/page'
        }`
};
