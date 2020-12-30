import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import configureStore, {MockStore} from 'redux-mock-store'

const mockStore = configureStore([]);


describe('<App />', () => {
    let store: MockStore
    beforeEach(() => {
        store = mockStore({
            reminders: {}
        });
    });

    test('it should mount', () => {
        render(<Provider store={store}><App/></Provider>);

        const reminderForm = screen.getByTestId('App');

        expect(reminderForm).toBeInTheDocument();
    });

});
