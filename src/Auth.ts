import { OAuth2Client } from "google-auth-library";
import * as Url from "url";

export default class AuthClient {
  config: any;
  authClient: any;

  private KEY: string;

  constructor(config: any) {
    this.config = config;
    this.authClient = new OAuth2Client(
      this.config.clientId,
      this.config.clientSecret,
      this.config.redirectUri
    );

    this.KEY = `flexin-${this.config.clientId}`;
    console.log(this.KEY, this.getTokens())
    this.authClient.setCredentials(this.getTokens());
  }

  init() {
    return this.authClient.getAccessToken()
      .then((tokens: any) => this.authClient.getTokenInfo(tokens.token))
      .catch((error: any) => console.log(error));
  }

  getIdToken() {
    return this.authClient.credentials.id_token;
  }

  isValid() {
    return !this.authClient.isTokenExpiring();
  }

  login() {
    const url = this.authClient.generateAuthUrl({
      access_type: this.config.accessType,
      scope: this.config.scopes
    });

    window.location.assign(url);
  }

  async consume() {
    var url = Url.parse(window.location.href, true)

    const { tokens } = await this.authClient.getToken(url.query.code)
    this.authClient.setCredentials(tokens);
    this.setTokens(tokens)
  }

  setTokens(tokens: any) {
    localStorage.setItem(this.KEY, JSON.stringify(tokens));
  }

  getTokens() {
    const tokens = localStorage.getItem(this.KEY);

    if (!tokens) {
      return {};
    }

    return JSON.parse(tokens);
  }
}
