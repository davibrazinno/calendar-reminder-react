import React from 'react';
import './Calendar.scss';
import {FcPrevious, FcNext} from 'react-icons/fc';
import {CALENDAR_VIEW, MonthView} from "../../redux/calendar/calendar.types";
import {Reminder} from "../../redux/reminders/reminders.types";
import {RemindersState} from "../../redux/reminders";

interface ICalendarProps {
    view: CALENDAR_VIEW;
    dates?: MonthView;
    reminders?: RemindersState;
    onPreviousMonth?: any;
    onNextMonth?: any;
    onAddReminder?: any;
}

const Calendar: React.FC<ICalendarProps> = (
    {
        dates,
        reminders,
        onNextMonth,
        onPreviousMonth,
        onAddReminder
    }): JSX.Element => {
    return (
        <main id="calendar">
            <section className="month-header">
                <button onClick={() => onPreviousMonth()} className='previous-month'>
                    <FcPrevious/>
                </button>
                <h1>{dates?.month} {dates?.year}</h1>
                <button onClick={() => onNextMonth()} className='next-month'>
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
                            {reminders && reminders[`${weekDay.year}${weekDay.month}${weekDay.day}`]?.map((reminder: Reminder, index) =>
                                <span key={index}>{reminder.description}</span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default Calendar;
