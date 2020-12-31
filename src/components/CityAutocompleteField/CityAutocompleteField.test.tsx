import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {CityAutocompleteField} from "./CityAutocompleteField";

describe('<CityAutocompleteField />', () => {
  test('it should mount', () => {
    render(<CityAutocompleteField initialValue='New York' onCitySelected={() => {}}/>);

    const cityAutocompleteField = screen.getByTestId('CityAutocompleteField');

    expect(cityAutocompleteField).toBeInTheDocument();
  });
});
