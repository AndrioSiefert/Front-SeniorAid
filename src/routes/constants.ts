export const routes = {
    profilePath: (userType: string, userId: number | null) =>
        `/${
            userType === 'senior'
                ? 'Senior-Controller/Profile-Senior'
                : 'Caregiver-Controller/Profile-Caregiver'
        }/${userId}`,
    myServices: (userType: string, userId: number | null) =>
        `/${
            userType === 'senior'
                ? 'Senior-Controller/MyService'
                : 'Caregiver-Controller/MyServices'
        }/${userId}`,
    createService: (userType: string) =>
        `/${
            userType === 'senior'
                ? 'Senior-Controller/Create-Service/page'
                : 'Caregiver-Controller/Create-Service/page'
        }`,
    listService: (userType: string) =>
        `/List-Service/${
            userType === 'senior'
                ? 'Order-CaregiverList/page'
                : 'Order-SeniorList/page'
        }`
};
