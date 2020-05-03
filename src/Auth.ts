import { OAuth2Client, LoginTicket, VerifyIdTokenOptions } from "google-auth-library";
import * as Url from "url";

export default class AuthClient {
  config: any;
  authClient: OAuth2Client;

  private KEY: string;

  constructor(config: any) {
    this.config = config;
    this.authClient = new OAuth2Client(
      this.config.clientId,
      this.config.clientSecret,
      this.config.redirectUri
    );

    this.KEY = `flexin-${this.config.clientId}`;
    this.authClient.setCredentials(this.getTokens());
  }

  init() {
    return this.authClient.getAccessToken()
      .then((tokens: any) => this.getProfile())
      .catch((error: any) => console.log("auth init error", error));
  }

  getProfile() {
    const idToken = this.getIdToken();

    if (!idToken) {
      return {};
    }

    return this.authClient.verifyIdToken({ idToken } as VerifyIdTokenOptions)
      .then((response: LoginTicket) => response.getPayload());
  }

  getIdToken() {
    return this.authClient.credentials.id_token;
  }

  isValid() {
    // @ts-ignore
    return this.authClient.credentials.expiry_date && !this.authClient.isTokenExpiring();
  }

  login() {
    const url = this.authClient.generateAuthUrl({
      access_type: this.config.accessType,
      scope: this.config.scopes,
      prompt: "consent"
    });

    window.location.assign(url);
  }

  async consume() {
    var url = Url.parse(window.location.href, true)

    const { tokens } = await this.authClient.getToken(url.query.code as string)
    this.authClient.setCredentials(tokens);
    this.setTokens(tokens)
  }

  setTokens(tokens: any) {
    // TODO: don't overwrite existing refresh token; make sure this actually works
    const updatedTokens = Object.assign(this.getTokens(), tokens);
    console.log(updatedTokens)
    localStorage.setItem(this.KEY, JSON.stringify(updatedTokens));
  }

  getTokens() {
    const tokens = localStorage.getItem(this.KEY);

    if (!tokens) {
      return {};
    }

    return JSON.parse(tokens);
  }
}
