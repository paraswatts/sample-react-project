import React from 'react';
import {
  Provider
} from 'react-redux';
import {
  PersistGate
} from 'redux-persist/lib/integration/react';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
const {
  defaultConfig: {
    PLATFORM,
    VERSION,
    ANALYTIC_TRACKING_ID
  }
} = require(`./config/default`);

const {
  store,
  persistor
} = require(`./redux/${PLATFORM}/store`);

const {
  RootRouter
} = require(`./routes/${PLATFORM}/${VERSION}/root-router`);

function App() {
  ReactGA.initialize(ANALYTIC_TRACKING_ID, {
    // debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123,
      name: 'tracker1'
    }
  });
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>

        <RootRouter />
      </Provider>
    </PersistGate>
  );
}

export default App;