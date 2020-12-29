import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.scss';
import {RootState} from "../redux/rootReducer";
import Calendar from "./calendar/Calendar";
import {nextMonth, previousMonth} from "../redux/calendar";
import {addReminder} from '../redux/reminders'
import {SET_MONTH_DATA} from "../redux/sagas/calendar";
import {Reminder} from "../redux/reminders/reminders.types";
import {MonthViewDay} from "../redux/calendar/calendar.types";


const App: React.FC = (): JSX.Element => {
    const {dates, currentDate, view} = useSelector((state: RootState) => state.calendar)
    const reminders = useSelector((state: RootState) => state.reminders)
    const dispatch = useDispatch()

    const prevCurrentDateRef: any = useRef();
    useEffect(() => {
        prevCurrentDateRef.current = currentDate;
    });
    const prevCurrentDate = prevCurrentDateRef.current;

    useEffect(() => {
        // update the calendar data when there is no data set (first load),
        // or when the currentDate is updated (next & previous actions)
        if (!dates || currentDate !== prevCurrentDate) {
            dispatch({
                type: SET_MONTH_DATA,
                payload: currentDate
            });
        }
    }, [dispatch, dates, currentDate, prevCurrentDate])

    return (
        <div className="App">
            <Calendar
                view={view}
                dates={dates}
                reminders={reminders}
                onNextMonth={() => dispatch(nextMonth())}
                onPreviousMonth={() => dispatch(previousMonth())}
                onAddReminder={(data: MonthViewDay) => dispatch(addReminder({
                    day: data.day,
                    month: data.month,
                    year: data.year,
                    description: 'Hello Reminder!'
                } as Reminder))}
            />
        </div>
    );
}

export default App;
