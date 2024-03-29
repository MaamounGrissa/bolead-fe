import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@app/app.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { SnackbarProvider } from 'notistack';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './utils/keycloak';
import MyApp from './MyApp';

const App: React.FunctionComponent = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const eventLogger = (event: unknown, error: unknown) => {
    console.log('onKeycloakEvent', event, error)
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tokenLogger = (tokens: unknown) => {
    console.log('onKeycloakTokens', tokens)
  }

  /* const initOptions = {
    onLoad: 'check-sso',
    promiseType: 'native',
    redirect_uri: window.location.href,
    checkLoginIframe: true,
    // enableBearerInterceptor: true,
    // bearerExcludedUrls: ['/assets'],
    flow: 'standard',
    silentCheckSsoFallback: false
  };
 */

const initOptions = {
  onLoad: 'login-required',
}

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      initOptions={initOptions}
    >
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <MyApp />
        </SnackbarProvider>
      </Provider>
    </ReactKeycloakProvider>
)};

export default App;
