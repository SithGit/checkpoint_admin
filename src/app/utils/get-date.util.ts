interface IDate {
    startDate: string;
    endDate: string;
}

export function getTodayDateRange(): IDate {
    const date = new Date();
    const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    date.setDate(date.getDate() + 1);
    const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return {
        startDate,
        endDate
    };
}
