# A Simple Calendar Reminder React App

This project implements a simple calendar reminder. Written in TypeScript using React and Redux, it uses [Luxon](https://moment.github.io/luxon/) internally to provide support to the calendar component.

The Calendar component intend to encapsulate the reminder. The component handles the reminders visualization and provide support to the CRUD actions through callback props.

The App component uses the Calendar component and stores the reminders in the Session Storage, using [Redux-Saga](https://redux-saga.js.org/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and upgraded to include Luxon, Sass, Redux Saga, Material UI, React Icons, and Cypress for E2E testing.

## Features

**Monthly view**:

Displays the current month with all the reminders. It allows navigating between the months using the arrows beside the current month and year on the calendar header.

![calendar-view](https://user-images.githubusercontent.com/76712257/103442849-5e5d8980-4c38-11eb-938a-5880b0ee6db1.png)

**Reminders view**:

The reminders are listed chronologically on the day section of the calendar. Each reminder displays its time, description, and optionally a city and weather data. The weather data is provided by [Open Weather Map](https://openweathermap.org/api) Free API. Note: the Free account provides historical data for 5 previous days and forecast for 7 days, outside of this range the weather data won't available.

![reminders-view](https://user-images.githubusercontent.com/76712257/103442968-5225fc00-4c39-11eb-9111-eeca37927db6.png)

**New Reminder**:

The reminders can be added by the "New Reminder" button on the top right corner, or by clicking on a specific day in the calendar. For the "New Reminder" the date and time are set by default as the current, when it's open by clicking on a day the date is set accordingly and the time is the current.
The description (1 to 30 characters), date and time are the required fields. The city and color are optional. The fields are labelled as `What?`, `When?`, `Where?`, and `Select Color`.

![new-reminder](https://user-images.githubusercontent.com/76712257/103442865-8b11a100-4c38-11eb-9ddd-a03b2d965d70.png)

**Validation**: Only the `What?` field is required, as the date and time always have a default value. It should have 1 to 30 character only.

![new-remider-what-required](https://user-images.githubusercontent.com/76712257/103442937-21de5d80-4c39-11eb-9f0f-06eca35161d0.png)

![new-remider-what-max30](https://user-images.githubusercontent.com/76712257/103442941-260a7b00-4c39-11eb-8dad-77e889952416.png)

**Date and Time**: The `When?` field displays a calendar with time selection, to open it the user need to click on the canledar icon in the right corner of the field.

![new-remider-date-time](https://user-images.githubusercontent.com/76712257/103442943-2c005c00-4c39-11eb-978b-a2bdd540d884.png)

**City**: The `Where?` is an autocomplete field, using Google Place Autocomplete API, it lists the predictions highlighting the character matches. The user must select one options from the list.

![new-remider_where](https://user-images.githubusercontent.com/76712257/103442871-94027280-4c38-11eb-9900-a8bd74baf4ed.png)

**Color**: The color has a default value, the user can click on the color to select another from the colors palette.

![new-remider_color](https://user-images.githubusercontent.com/76712257/103442956-3b7fa500-4c39-11eb-9cac-d349da9e8b94.png)

**Edit & Remove**: The reminders can be edited by clicking over them. There is a delete option in the edit mode.

![edit-remove-remider](https://user-images.githubusercontent.com/76712257/103442964-44707680-4c39-11eb-8123-4bcee3f8222f.png)


## Limitations

This project was developed as a 5 days challenge. Some paths were taken to deliver all the features stable in time. As future enhancements we have:

User Experience:
- Delete confirmation: The delete options are done in one click, there is no confirmation dialog.
- Layout enhancements: The reminder view layout and color need to be polished, borders, spacing and contrast must be reviewed.

Code:
- Consolidate styles: The CSS isn't unified, it's spread over the components.
- Custom styles: The styles cannot be customized, provide style props to override the default colors.
- City autocomplete field was bootstrapped from the [Material UI Google Maps Places Autocomplete](https://material-ui.com/components/autocomplete/#GoogleMaps.tsx), the adaptations were basically on the API parameter to fetch only cities and on the library loading, that it's already loaded in the index.html file using an API Key for this project. This component needs to be polished, the API service moved to the `api/`.

Testing:
- Increase unit test coverage: the unit tests provided are minimal. There aren't specific unit tests for the CityAutocompleteField component, testing Material UI Autocomplete is complex, there are some challenges to control the component on unit tests. It needs more efforts, another options would be to create the autocomplete component from the scratch making sure it'll be easily testable.
- Increase e2e test coverage: only two acceptance tests were written: "should not create a reminder without the description" and "should create a reminder with description, date, time, city and color". All the acceptance criteria can be mapped and covered easily using Cypress scripts.


## Project directory layout
    .
    ├── public                  # Static files (index.html,...)
    ├── src                     # Sources and Unit Tests
    │   ├── api                 # External APIs (openweather, google geocoder)
    │   ├── components          # React components (Calendar.tsx, Reminder.tsx, ...)
    │   ├── redux               # Redux, Redux-saga, Reducers, and Store
    │   └── ...                 
    ├── cypress                 # Cypress (E2E tests)
    |   ├── integration         # E2E scripts (Calendar.js)
    |   └── ...                 
    └─...
    
## How to use

In the project directory, you can run:

### `yarn`

Install the app.<br />

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Unit Tests: Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:e2e`

E2E Tests: Launches the cypress test runner.<br />
Here's a sample video:

[![Watch the video](https://user-images.githubusercontent.com/76712257/103444026-843c5b80-4c43-11eb-87c2-541d3ef56cc9.gif)](https://user-images.githubusercontent.com/76712257/103430877-3f62e700-4ba7-11eb-8485-7fbc0a62d73a.mp4)

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
