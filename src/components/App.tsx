import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.scss';
import {RootState} from "../redux/rootReducer";
import Calendar from "./Calendar/Calendar";
import {addReminderRequest, deleteDayReminderAction, deleteReminderAction} from "../redux/reminders/actions";
import {ReminderModel} from "../redux/reminders/types";


const App: React.FC = (): JSX.Element => {
    const reminders = useSelector((state: RootState) => state.reminders)
    const dispatch = useDispatch()

    const addReminder = (reminder: ReminderModel) => {
        dispatch(addReminderRequest(reminder))
    }

    const deleteReminder = (reminder: ReminderModel) => {
        dispatch(deleteReminderAction(reminder))
    }

    const deleteDayReminders = (dayKey: string) => {
        dispatch(deleteDayReminderAction(dayKey))
    }

    return (
        <div className="App" data-testid="App">
            <Calendar
                reminders={reminders}
                onAddReminder={addReminder}
                onDeleteReminder={deleteReminder}
                onDeleteDayReminders={deleteDayReminders}
            />
        </div>
    );
}

export default App;
