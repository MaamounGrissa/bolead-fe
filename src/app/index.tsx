import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { Provider } from 'react-redux';
import { store } from './store';
//import AuthContextProvider from './context/AuthContextProvider';
//import { ReactKeycloakProvider } from "@react-keycloak/web";
//import keycloak from './utils/keycloak';
//import Home from './Home/Home';
import AuthContextProvider from './context/AuthContextProvider';
import { SnackbarProvider } from 'notistack';
//import PrivateRoute from './utils/privateRoute';

const App: React.FunctionComponent = () => (
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <Router>
          <SnackbarProvider maxSnack={3}>
            <AppLayout>
                <AppRoutes />
            </AppLayout>
          </SnackbarProvider>
        </Router>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

export default App;
