import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://bolead.vercel.app/auth",
 realm: "jhipster",
 clientId: "bolead_app",
});

export default keycloak;