import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import configureStore, {MockStore} from 'redux-mock-store'
import {DateTime} from "luxon";

const mockStore = configureStore([]);

describe('renders learn react link', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      reminders: {}
    });
  });

  it('initial basic test', () => {
    const { getByText } = render(<Provider store={store}><App /></Provider>);
    const currentDate = DateTime.local()
    const linkElement = getByText(new RegExp(`${currentDate.monthLong}[\\s+]${currentDate.year}`));
    expect(linkElement).toBeInTheDocument();
  })

});
