import {DateTime} from "luxon";
import {MonthView, MonthViewDay, NON_WORKING_DAYS} from "./calendar.types";

const isWorkingDay = (day: DateTime) => {
    return NON_WORKING_DAYS.indexOf(day.weekdayLong) === -1
}

const createMonthViewDay = (date: DateTime, currentMonth: boolean): MonthViewDay => {
    return {
        day: date.day,
        month: date.month,
        year: date.year,
        isCurrentMonth: currentMonth,
        isWorkingDay: isWorkingDay(date)
    }
}

export function createMonthView(today: DateTime) {
    const firstWeek = []

    const firstDay = today.startOf('month')
    const lastDay = today.endOf('month')
    // count the number of days from the last month based on the weekday (Sunday => 0, Monday = 1, ...)
    const lastMonthDays = firstDay.weekday === 7 ? 0 : firstDay.weekday

    // include the days from the last month if required
    let countLastMonthDays = lastMonthDays
    while (countLastMonthDays > 0) {
        const pastMonthDay = firstDay.minus({days: countLastMonthDays})
        const day = createMonthViewDay(pastMonthDay, false)
        firstWeek.push(day)
        countLastMonthDays--
    }

    // include all the remaining days from the first week
    let countCurrentMonthDays = 7 - lastMonthDays
    let currentMonthDay = firstDay
    while (countCurrentMonthDays > 0) {
        const day = createMonthViewDay(currentMonthDay, true)
        firstWeek.push(day)
        currentMonthDay = currentMonthDay.plus({day: 1})
        countCurrentMonthDays--
    }

    const monthView: MonthView = {
        year: today.year,
        month: today.monthLong,
        weeks: [firstWeek]
    }

    // include the remaining weeks
    let nextWeek = []
    while (currentMonthDay <= lastDay) {
        const day = createMonthViewDay(currentMonthDay, true)
        nextWeek.push(day)
        currentMonthDay = currentMonthDay.plus({day: 1})
        if (currentMonthDay.weekday === 7) {
            monthView.weeks.push(nextWeek)
            nextWeek = []
        }
    }

    // include the remaining days from the next month if required
    let nextMonthDay = currentMonthDay
    let nextMonthDays = 7 - (nextMonthDay.weekday === 7 ? 0 : nextMonthDay.weekday)
    while (nextMonthDays > 0) {
        const day = createMonthViewDay(nextMonthDay, false)
        nextWeek.push(day)
        nextMonthDay = nextMonthDay.plus({day: 1})
        nextMonthDays--
        if (nextMonthDays === 0) {
            monthView.weeks.push(nextWeek)
            nextWeek = []
        }
    }

    return monthView
}
