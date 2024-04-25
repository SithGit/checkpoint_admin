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

export function getWeekDateRange(): IDate {
    const date = new Date();
    const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    date.setDate(date.getDate() + 7);
    const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return {
        startDate,
        endDate
    };
}

export function getMonthDateRange(): IDate {
    const date = new Date();
    const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;
    date.setMonth(date.getMonth() + 1);
    const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;

    return {
        startDate,
        endDate
    };
}

export function getYearDateRange(): IDate {
    const date = new Date();
    const startDate = `${date.getFullYear()}-01-01`;
    const endDate = `${date.getFullYear() + 1}-01-01`;

    return {
        startDate,
        endDate
    };
}
