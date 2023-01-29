import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FunctionComponent = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </Provider>
  </React.StrictMode>
);

export default App;
