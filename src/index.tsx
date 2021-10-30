import React from 'react';
import {render as renderApp} from 'react-dom';
import {Provider} from 'react-redux';

import store from 'store';

import ErrorBoundary from 'elements/structures/error-boundary';
import Router from 'elements/router';

import 'styles/fonts.scss';
import 'styles/normalize.scss';

//------------------------------------------------------------------------------

renderApp(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
