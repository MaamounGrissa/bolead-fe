import * as React from 'react';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import { useKeycloak } from '@react-keycloak/web'
import LoginPage from './LoginPage/LoginPage';
import { PrivateRoute } from './utils/privateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashLoader } from 'react-spinners';

const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Layout: React.FunctionComponent = () => (
    <AppLayout>
        <AppRoutes />
    </AppLayout>
)

const MyApp: React.FunctionComponent = () => {
  const { initialized } = useKeycloak();

  const LoadingSpinner = (
    <div className="loading-spinner">
        <HashLoader
          color="#444"
          loading={true}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  );

  if (!initialized) return LoadingSpinner

  return (
    <Router>
        <PrivateRoute path="/" component={Layout}/>
        <Route path="/login" component={LoginPage} />
    </Router>
    
)};

export default MyApp;
