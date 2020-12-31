import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calendar from './Calendar';
import {ReminderColor} from "../../redux/reminders/types";
import {DateTime} from "luxon";

const defaultColor = ReminderColor.BLUE_1_DARK
const now = DateTime.local()
const defaultDay = now.day
const defaultMonth = now.month
const defaultYear = now.year

describe('<Calendar />', () => {
    test('it should mount', () => {
        render(<Calendar/>);

        const reminder = screen.getByTestId('Calendar');

        expect(reminder).toBeInTheDocument();
    });


    test('it should not add a reminder without a description', async () => {
        const onAddRemainder = jest.fn();
        render(<Calendar onAddReminder={onAddRemainder}/>);

        expect(screen.queryByText('Cancel')).toBeNull()
        expect(screen.queryByText('Save')).toBeNull()

        screen.getByTestId('NewReminderButton').click()

        await waitFor(() => {
            expect(screen.queryByText('The description is required')).toBeFalsy()
            expect(screen.queryByText('Cancel')).not.toBeNull()
            expect(screen.queryByText('Save')).not.toBeNull()
        })

        screen.getByTestId('SaveReminderButton').click()

        await waitFor(() => {
            expect(screen.queryByText('The description is required')).toBeTruthy()
            expect(screen.queryByText('Cancel')).not.toBeNull()
            expect(screen.queryByText('Save')).not.toBeNull()
            expect(onAddRemainder).not.toHaveBeenCalled()
        })
    })

    test('it should not add a reminder when the description has more than 30 chars', async () => {
        const mockDescription = '0123456789012345678901234567891' // 31 chars

        const onAddRemainder = jest.fn();
        render(<Calendar onAddReminder={onAddRemainder}/>);

        screen.getByTestId('NewReminderButton').click()

        await waitFor(() => {
            expect(screen.getByTestId('DescriptionInput')).not.toBeNull()
            expect(screen.queryByText('Save')).not.toBeNull()
        })

        const inputDescription = screen.getByTestId('DescriptionInput')
        fireEvent.change(inputDescription, { target: { value: mockDescription} })

        screen.getByTestId('SaveReminderButton').click()

        await waitFor(() => {
            expect(screen.queryByText('The description must have up to 30 characters')).toBeTruthy()
            expect(screen.queryByText('Cancel')).not.toBeNull()
            expect(screen.queryByText('Save')).not.toBeNull()
            expect(onAddRemainder).not.toHaveBeenCalled()
        })
    })

    test('it should add a reminder with a description and the default values', async () => {
        const mockDescription = 'I am a minimal reminder!'

        const onAddRemainder = jest.fn();
        render(<Calendar onAddReminder={onAddRemainder}/>);

        screen.getByTestId('NewReminderButton').click()

        await waitFor(() => {
            expect(screen.getByTestId('DescriptionInput')).not.toBeNull()
            expect(screen.queryByText('Save')).not.toBeNull()
        })

        const inputDescription = screen.getByTestId('DescriptionInput')
        fireEvent.change(inputDescription, { target: { value: mockDescription} })

        screen.getByTestId('SaveReminderButton').click()

        await waitFor(() => {
            expect(screen.queryByText('Save')).toBeNull()
            expect(onAddRemainder).toHaveBeenCalledTimes(1)
            expect(onAddRemainder).toHaveBeenCalledWith(expect.objectContaining({
                description: mockDescription,
                color: defaultColor,
                day: defaultDay,
                month: defaultMonth,
                year: defaultYear,
                id: expect.stringContaining('-') // from the generated UUID
            }))
        })
    })

});
