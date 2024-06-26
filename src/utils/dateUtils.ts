export const formatISODateToBrazilian = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
};

export const formatBrazilianDateToISO = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}T00:00:00.000Z`;
};
