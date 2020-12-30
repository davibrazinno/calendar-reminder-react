import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReminderForm from './ReminderForm';

describe('<ReminderForm />', () => {
  test('it should mount', () => {
    render(<ReminderForm onSave={() => {}}/>);

    const reminderForm = screen.getByTestId('ReminderForm');

    expect(reminderForm).toBeInTheDocument();
  });
});
