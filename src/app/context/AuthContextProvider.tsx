/* eslint-disable @typescript-eslint/no-explicit-any */
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import React, { createContext, useEffect, useState } from "react";

/**
 * KeycloakConfig configures the connection to the Keycloak server.
 */
const keycloakConfig: KeycloakConfig = {
    url: process.env.KEYCLOAK_URL || "http://keycloak.bolead.creo.tn/",
    realm: process.env.KEYCLOAK_REALM || "jhipster",
    clientId: process.env.KEYCLOAK_CLIENT_ID || "bolead_app_local",
};

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: "login-required",
};

// Create the Keycloak client instance
const keycloak = Keycloak(keycloakConfig);

/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
interface AuthContextValues {
  /**
   * Whether or not a user is currently authenticated
   */
  token: string;
  isAuthenticated: boolean;
  logout: () => void;
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
    token: "",
    isAuthenticated: false,
    logout: () => {console.log("logout");}
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  children: JSX.Element;
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {
  //console.log("rendering AuthContextProvider");

  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      console.log("initialize Keycloak");
      try {
        const isAuthenticatedResponse = await keycloak.init(
          keycloakInitOptions
        ).then(res => {
          console.log("authenticated", res)
          return res;
        });
        
        if (!isAuthenticatedResponse) {
          console.log(
            "user is not yet authenticated. forwarding user to login."
          );
          keycloak.login();
        }
        console.log("user already authenticated", isAuthenticatedResponse);
        const myToken: any = keycloak.token;
        setToken(myToken);
        localStorage.setItem("token", myToken);
        setAuthenticated(isAuthenticatedResponse);
      } catch {
        console.log("error initializing Keycloak");
        setToken(null);
        localStorage.removeItem("token");
        setAuthenticated(false);
      }
    }

    initializeKeycloak();
  }, []);

  const logout = () => {
    keycloak.logout();
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;