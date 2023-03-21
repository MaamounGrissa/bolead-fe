/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent
} from '@patternfly/react-core';
import { routes, IAppRoute, IAppRouteGroup } from '@app/routes';
//import logo from '@app/bgimages/logo.png';
import axios from 'axios';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  /* function LogoImg() {
    const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return (
      <img width={120} src={logo} onClick={handleClick} alt="PatternFly Logo" />
    );
  } */

  const [weather, setWeather] = React.useState<any>(null);

  const getCurrentParisWeather = async () => {
    axios.get('https://weatherapi-com.p.rapidapi.com/current.json?q=Paris', {
      headers: {
        'X-RapidAPI-Key': 'b8630dc2bamsh169615709508bcbp162695jsn727caf34ef0f',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }).then((response) => {
      setWeather(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };
  
  React.useEffect(() => {
    getCurrentParisWeather();
  }, []);

  console.log(weather)

  const Header = (
    <PageHeader
      logo={<h1 className='app_title'>BOLEAD</h1>}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      headerTools={<div className='bolead-header-content'>Paris&nbsp;&nbsp;<img src={weather?.current?.condition?.icon} alt="weather" width={45} height={45} /></div>}
    />
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname}>
      <NavLink exact={route.exact} to={route.path}>
        {route.label}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
        )}
        <NavItem key="logout" id="logout" 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setTimeout(() => {
                  window.location.href = '/login';
                }, 500);
              }}
            >
          <NavLink exact to="#">
            Logout
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );

  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen}
      />
  );

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent onClick={(event) => {
      event.preventDefault();
      const primaryContentContainer = document.getElementById(pageId);
      primaryContentContainer && primaryContentContainer.focus();
    }} href={`#${pageId}`}>
      Skip to Content
    </SkipToContent>
  );

    return (
      <Page
        mainContainerId={pageId}
        header={Header}
        sidebar={Sidebar}
        onPageResize={onPageResize}
        skipToContent={PageSkipToContent}>
        {children}
      </Page>
    );
};

export { AppLayout };
