import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@app/app.css';
import { Provider } from 'react-redux';
import { store } from './store';
//import AuthContextProvider from './context/AuthContextProvider';
//import { ReactKeycloakProvider } from "@react-keycloak/web";
//import keycloak from './utils/keycloak';
//import Home from './Home/Home';
//import AuthContextProvider from './context/AuthContextProvider';
import { SnackbarProvider } from 'notistack';
//import PrivateRoute from './utils/privateRoute';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './utils/keycloak';
import MyApp from './myApp';

const App: React.FunctionComponent = () => {

  const eventLogger = (event: unknown, error: unknown) => {
    console.log('onKeycloakEvent', event, error)
  }
  
  const tokenLogger = (tokens: unknown) => {
    console.log('onKeycloakTokens', tokens)
  }

  return (
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      initOptions={{
        onLoad: 'login-required',
      }}
    >
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <MyApp />
        </SnackbarProvider>
      </Provider>
    </ReactKeycloakProvider>
  </React.StrictMode>
)};

export default App;
