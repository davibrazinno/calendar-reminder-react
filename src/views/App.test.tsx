import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import configureStore, {MockStore} from 'redux-mock-store'

const mockStore = configureStore([]);

describe('renders learn react link', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      count: 1,
    });
  });

  it('testing react redux-saga', () => {
    const { getByText } = render(<Provider store={store}><App /></Provider>);
    const linkElement = getByText(/save to reload\./i);
    expect(linkElement).toBeInTheDocument();
  })

});
