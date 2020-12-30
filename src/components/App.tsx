import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.scss';
import {RootState} from "../redux/rootReducer";
import Calendar from "./Calendar/Calendar";
import {addReminderRequest} from "../redux/reminders/actions";
import {ReminderModel} from "../redux/reminders/types";


const App: React.FC = (): JSX.Element => {
    const reminders = useSelector((state: RootState) => state.reminders)
    const dispatch = useDispatch()

    const addReminder = (reminder: ReminderModel) => {
        dispatch(addReminderRequest(reminder))
    }

    return (
        <div className="App" data-testid="App">
            <Calendar
                reminders={reminders}
                onAddReminder={addReminder}
            />
        </div>
    );
}

export default App;
