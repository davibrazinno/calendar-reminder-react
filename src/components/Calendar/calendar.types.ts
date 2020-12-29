export enum CALENDAR_VIEW {
    MONTH = "MONTH"
}

export const NON_WORKING_DAYS = ['Sunday', 'Saturday']

export interface MonthViewDay {
    day: number,
    month: number,
    year: number,
    isWorkingDay: boolean,
    isCurrentMonth: boolean
}

export interface MonthView {
    year: number,
    month: string,
    weeks: [MonthViewDay[]]
}
