import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DateTime} from "luxon";
import {CALENDAR_VIEW, MonthView} from "./calendar.types";


type CalendarState = {
    view: CALENDAR_VIEW,
    currentDate: number,
    dates?: MonthView
}

let initialState: CalendarState = {
    currentDate: new Date().getTime(),
    view: CALENDAR_VIEW.MONTH
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setMonth(state, action: PayloadAction<MonthView>) {
            state.dates = action.payload
        },
        nextMonth(state) {
            if (state.currentDate) {
                const nextMonth = DateTime.fromMillis(state.currentDate).plus({months: 1})
                state.currentDate = nextMonth.toJSDate().getTime()
            }
        },
        previousMonth(state) {
            if (state.currentDate) {
                const nextMonth = DateTime.fromMillis(state.currentDate).minus({months: 1})
                state.currentDate = nextMonth.toJSDate().getTime()
            }
        }
    }
})

export const {
    setMonth,
    nextMonth,
    previousMonth
} = calendarSlice.actions

export default calendarSlice.reducer
