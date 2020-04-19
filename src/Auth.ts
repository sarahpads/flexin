import ClientOAuth2 from 'client-oauth2';
import jwtDecode from 'jwt-decode';

class AuthClient {
  public config: ClientOAuth2.Options;
  public authClient: ClientOAuth2;
  public tokens: any;
  public session: any;

  private KEY: string;

  constructor(config: ClientOAuth2.Options) {
    this.config = config;
    this.authClient = new ClientOAuth2(config);
    this.KEY = `flexin-${this.config.clientId}`;

    this.tokens = this.getTokens();
    this.session = this.tokens && jwtDecode(this.getIdToken());
  }

  init() {
    // If it's a brand new session, reject right away
    if (!this.tokens) {
      return Promise.reject();
    }

    // if our tokens are still valid, let 'em through
    if (!this.isExpired()) {
      return Promise.resolve();
    }

    // otherwise, let's try to refresh
    return this.refresh();
  }

  login() {
    const uri = this.authClient.code.getUri()

    window.location.assign(uri);
  }

  consume() {
    debugger;
    return this.authClient.code.getToken(window.location.href)
      .then(this.storeTokens.bind(this))
      .catch((error: any) => console.log(error));
  }

  refresh() {
    return this.tokens.refresh()
      .then(this.storeTokens.bind(this))
      .catch((error: any) => console.log(error));
  }

  getAccessToken() {
    return this.tokens?.accessToken;
  }

  getIdToken() {
    return this.tokens?.data.id_token;
  }

  getRefreshToken() {
    return this.tokens?.refreshToken;
  }

  isExpired() {
    console.log(this.tokens.expired())
    debugger;
    return this.tokens.expired();
  }

  isValid() {
    return !!this.tokens && !this.isExpired();
  }

  private storeTokens(result: any) {
    console.log('store', result)
    this.tokens = result;

    localStorage.setItem(
      this.KEY,
      JSON.stringify(result)
    )

    return this.tokens;
  }

  private getTokens() {
    const tokens = localStorage.getItem(this.KEY);
    debugger;

    if (!tokens) {
      return;
    }

    const data = JSON.parse(tokens);
    return new ClientOAuth2.Token(this.authClient, data)
  }
}

export default AuthClient;
