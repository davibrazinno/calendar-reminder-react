import React from 'react';
import styles from './Reminder.module.scss';
import {ReminderModel} from "../../redux/reminders/types";

interface IReminderProps {
    data: ReminderModel;
}

const Reminder: React.FC<IReminderProps> = (props: IReminderProps) => {
    const {data} = props
    return (
        <div className={styles.Reminder} data-testid="Reminder">
            <span>{data.dateTime} - {data.description}</span>
        </div>
    );
}

export default Reminder;
