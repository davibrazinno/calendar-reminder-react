# calendar-reminder-react
A Simple Calendar Reminder React App.

This project implements a simple calendar reminder. Written in TypeScript using React and Redux, it uses [Luxon](https://moment.github.io/luxon/) internally to provide support to the calendar component.

The Calendar component intend to encapsulate the reminder. The component handles the reminders visualization and provide support to the CRUD actions through callback props.

The App component uses the Calendar component and stores the reminders in the Session Storage, using [Redux-Saga](https://redux-saga.js.org/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and upgraded to include Luxon, Sass, Redux Saga, Material UI, React Icons, and Cypress for E2E testing.

### Project directory layout
    .
    ├── cypress                 # Cypress (E2E tests)
    |   ├── integration         # E2E scripts (Calendar.js)
    |   └── ...                 
    ├── public                  # Static files (index.html,...)
    ├── src                     # Sources and Unit Tests
    │   ├── api                 # External APIs (openweather, google geocoder)
    │   ├── components          # React components (Calendar.tsx, Reminder.tsx, ...)
    │   ├── redux               # Redux, Redux-saga, Reducers, and Store
    │   └── ...                 
    └─...
    
## Available Scripts

In the project directory, you can run:

### `yarn`

Install the app.<br />

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:e2e`

Launches the cypress test runner in the interactive watch mode.<br />
Here's a sample video:

![Sample video](https://user-images.githubusercontent.com/76712257/103430877-3f62e700-4ba7-11eb-8485-7fbc0a62d73a.mp4)


### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
