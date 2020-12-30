import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.scss';
import {RootState} from "../redux/rootReducer";
import Calendar from "./Calendar/Calendar";
import {MonthViewDay} from "./Calendar/calendar.types";
import {addReminderRequest} from "../redux/reminders/actions";
import {ReminderColor} from "../redux/reminders/types";
import {DateTime} from "luxon";


const App: React.FC = (): JSX.Element => {
    const reminders = useSelector((state: RootState) => state.reminders)
    const dispatch = useDispatch()

    const addReminder = (reminder: MonthViewDay) => dispatch(addReminderRequest({
        day: reminder.day,
        month: reminder.month,
        year: reminder.year,
        description: 'Hello Reminder!',
        dateTime: DateTime.local().set({year: reminder.year, month: reminder.month, day: reminder.day}).toMillis(),
        color: ReminderColor.RED,
        city: 'Florianópolis'
    }))

    return (
        <div className="App" data-testid="App">
            <Calendar
                reminders={reminders}
                onAddReminder={(data: MonthViewDay) => addReminder(data)}
            />
        </div>
    );
}

export default App;
