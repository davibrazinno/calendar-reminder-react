import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Reminder from './Reminder';
import {ReminderModel} from "../../redux/reminders/types";

describe('<Reminder />', () => {
  test('it should mount', () => {
    const mockReminder = {dateTime: new Date().getTime()} as ReminderModel
    render(<Reminder data={mockReminder} onRemainderClicked={() => {}}/>);

    const reminder = screen.getByTestId('Reminder');

    expect(reminder).toBeInTheDocument();
  });
});
