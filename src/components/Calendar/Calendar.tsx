import React, {useEffect, useState} from 'react';
import './Calendar.scss';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {MonthView, MonthViewDay} from "./calendar.types";
import {ReminderModel} from "../../redux/reminders/types";
import {createMonthView} from "./calendar.utils";
import {DateTime} from "luxon";
import {RemindersState} from "../../redux/reminders/reducer";
import Reminder from "../Reminder/Reminder";
import ReminderForm from "../ReminderForm/ReminderForm";

interface ICalendarProps {
    reminders?: RemindersState;
    onAddReminder?: any;
}

const Calendar: React.FC<ICalendarProps> = (props: ICalendarProps) => {
    const {onAddReminder, reminders} = props

    const [dates, setDates] = useState<MonthView>(createMonthView(DateTime.local()))

    const [currentDate, setCurrentDate] = useState<number>(DateTime.local().toMillis())

    useEffect(() => {
        setDates(createMonthView(DateTime.fromMillis(currentDate)))
    }, [currentDate])

    const previousMonth = () => setCurrentDate(DateTime.fromMillis(currentDate).minus({months: 1}).toMillis())

    const nextMonth = () => setCurrentDate(DateTime.fromMillis(currentDate).plus({months: 1}).toMillis())

    const [reminder, setReminder] = useState<ReminderModel>({description: '', dateTime: new Date().getTime()} as ReminderModel)

    const updateReminder = (reminderUpdated: ReminderModel) => {
        setOpenReminder(false)
        setReminder({} as ReminderModel)
        onAddReminder(reminderUpdated)
    }

    const cancelReminder = () => {
        setReminder({} as ReminderModel)
        setOpenReminder(false)
    }

    // TODO refactor models
    const [openReminder, setOpenReminder] = useState(false)
    const openReminderDialog = (newReminder: MonthViewDay) => {
        setReminder({
            dateTime: DateTime.local().set({day: newReminder.day, month: newReminder.month, year: newReminder.year}).toMillis(),
        } as ReminderModel)
        setOpenReminder(true)
    }

    return (
        <main id="calendar" data-testid="Calendar">
            <ReminderForm
                onSave={updateReminder}
                onCancel={cancelReminder}
                data={reminder}
                openReminder={openReminder}
            />
            <section className="month-header">
                <button onClick={() => previousMonth()} className='previous-month'>
                    <NavigateBeforeIcon/>
                </button>
                <h1>{dates?.month} {dates?.year}</h1>
                <button onClick={() => nextMonth()} className='next-month'>
                    <NavigateNextIcon/>
                </button>
            </section>
            <section className="week-headers">
                <span>Sunday</span>
                <span>Monday</span>
                <span>Tuesday</span>
                <span>Wednesday</span>
                <span>Thursday</span>
                <span>Friday</span>
                <span>Saturday</span>
            </section>
            {dates?.weeks.map((week, index) =>
                <div className="week" key={index}>
                    {week.map((weekDay) =>
                        <div key={`${weekDay.month}${weekDay.day}`}
                             onClick={(e) => weekDay.isCurrentMonth ? openReminderDialog(weekDay) : e.preventDefault()}
                             data-date={weekDay.day}
                             className={`day-block ${weekDay.isWorkingDay ? '' : 'no-working-day'} ${weekDay.isCurrentMonth ? '' : 'other-month-day'}`}
                             onKeyPress={() => {
                             }} /* jsx-a11y/click-events-have-key-events: Visible, non-interactive elements with click handlers must have at least one keyboard listener */
                             role='button'
                             tabIndex={0}>
                            {reminders && reminders[`${weekDay.year}${weekDay.month}${weekDay.day}`]?.map((reminder: ReminderModel, index) =>
                                <Reminder data={reminder} key={index}/>
                            )}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default Calendar;
