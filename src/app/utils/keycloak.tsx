import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL || "https://keycloak.bolead.creo.tn/",
  realm: process.env.KEYCLOAK_REALM || "jhipster",
  clientId: process.env.KEYCLOAK_CLIENT_ID || "bolead_app_local",
});

export default keycloak;