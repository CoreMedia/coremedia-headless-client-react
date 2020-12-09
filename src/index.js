// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import Fragment from './containers/Fragment';
import ErrorBoundary from './containers/ErrorBoundary';
import theme from './styles/themes/default';
import registerServiceWorker from './registerServiceWorker';

const elements = document.getElementsByTagName('cm-fragment');

for (const item of elements) {
  const { id, show, view, params } = item.dataset;
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Fragment id={id} show={show} view={view} params={params} />
      </ErrorBoundary>
    </ThemeProvider>,
    item
  );
}

registerServiceWorker();
