import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.scss';
import {RootState} from "../redux/rootReducer";
import Calendar from "./Calendar/Calendar";
import {MonthViewDay} from "./Calendar/calendar.types";
import {addReminderRequest} from "../redux/reminders/actions";


const App: React.FC = (): JSX.Element => {
    const reminders = useSelector((state: RootState) => state.reminders)
    const dispatch = useDispatch()

    const addReminder = (reminder: MonthViewDay) => dispatch(addReminderRequest({
        day: reminder.day,
        month: reminder.month,
        year: reminder.year,
        description: 'Hello Reminder!',
        dateTime: new Date().getTime()
    }))

    return (
        <div className="App">
            <Calendar
                reminders={reminders}
                onAddReminder={(data: MonthViewDay) => addReminder(data)}
            />
        </div>
    );
}

export default App;
