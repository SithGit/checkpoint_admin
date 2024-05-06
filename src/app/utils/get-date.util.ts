interface IDate {
    startDate: string;
    endDate: string;
}
export function getDateRange(fromDate: string, toDate: string): IDate {
    const sdate = new Date(fromDate);
    const edate = new Date(toDate);
    const startDate = `${sdate.getFullYear()}-${(sdate.getMonth() + 1).toString().padStart(2, '0')}-${sdate.getDate().toString().padStart(2, '0')}`;
    const endDate = `${edate.getFullYear()}-${(edate.getMonth() + 1).toString().padStart(2, '0')}-${edate.getDate().toString().padStart(2, '0')}`;

    console.log('changed date', startDate, endDate);
    return {
        startDate,
        endDate
    };
}
