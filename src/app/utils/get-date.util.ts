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
    date.setDate(date.getDate() - 7);
    const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    date.setDate(date.getDate() + 8);
    const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return {
        startDate,
        endDate
    };
}

export function getMonthDateRange(): IDate {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    date.setDate(date.getDate() + 31);
    const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return {
        startDate,
        endDate
    };
}

export function getYearDateRange(): IDate {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const startDate = `${date.getFullYear()}-01-01`;
    date.setFullYear(date.getFullYear() + 1);
    const endDate = `${date.getFullYear()}-01-01`;

    return {
        startDate,
        endDate
    };
}
