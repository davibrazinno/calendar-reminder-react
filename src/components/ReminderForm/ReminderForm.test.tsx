import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReminderForm from './ReminderForm';
import {ReminderModel} from "../../redux/reminders/types";

describe('<ReminderForm />', () => {
  test('it should mount', () => {
    const mockReminder = {dateTime: new Date().getTime()} as ReminderModel
    render(<ReminderForm onSave={(reminder: ReminderModel) => {}} onCancel={() => {}} data={mockReminder}/>);

    const reminderForm = screen.getByTestId('ReminderForm');

    expect(reminderForm).toBeInTheDocument();
  });
});
