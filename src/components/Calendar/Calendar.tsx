import React, {useEffect, useState} from 'react';
import './Calendar.scss';
import {FcNext, FcPrevious} from 'react-icons/fc';
import {MonthView} from "./calendar.types";
import {ReminderModel} from "../../redux/reminders/types";
import {createMonthView} from "./calendar.utils";
import {DateTime} from "luxon";
import {RemindersState} from "../../redux/reminders/reducer";
import Reminder from "../Reminder/Reminder";

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

    return (
        <main id="calendar" data-testid="Calendar">
            <section className="month-header">
                <button onClick={() => previousMonth()} className='previous-month'>
                    <FcPrevious/>
                </button>
                <h1>{dates?.month} {dates?.year}</h1>
                <button onClick={() => nextMonth()} className='next-month'>
                    <FcNext/>
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
                             onClick={(e) => weekDay.isCurrentMonth ? onAddReminder(weekDay) : e.preventDefault()}
                             data-date={weekDay.day}
                             className={`${weekDay.isWorkingDay ? '' : 'no-working-day'} ${weekDay.isCurrentMonth ? '' : 'other-month-day'}`}
                             onKeyPress={() => {}} /* jsx-a11y/click-events-have-key-events: Visible, non-interactive elements with click handlers must have at least one keyboard listener */
                             role='button'
                             tabIndex={0}>
                            {reminders && reminders[`${weekDay.year}${weekDay.month}${weekDay.day}`]?.map((reminder: ReminderModel, index) =>
                                <Reminder data={reminder} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default Calendar;
