import ClientOAuth2 from 'client-oauth2';
import jwtDecode from 'jwt-decode';

class AuthClient {
  public config: ClientOAuth2.Options;
  public authClient: ClientOAuth2;
  public tokens: any;
  public session: any;

  constructor(config: ClientOAuth2.Options) {
    this.config = config;
    this.authClient = new ClientOAuth2(config);
    this.tokens = this.getTokens();
    this.session = jwtDecode(this.getIdToken());
  }

  init() {
    if (!this.isExpired()) {
      return Promise.resolve();
    }

    return this.refresh();
  }

  login() {
    const uri = this.authClient.code.getUri()

    window.location.assign(uri);
  }

  consume() {
    return this.authClient.code.getToken(window.location.href)
      .then(this.storeTokens)
      .catch((error: any) => console.log(error));
  }

  refresh() {
    return this.tokens.refresh()
      .then(this.storeTokens)
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
    return this.tokens.expired();
  }

  private storeTokens(result: any) {
    this.tokens = new ClientOAuth2.Token(this.authClient, result.data)

    localStorage.setItem(
      `flexin-${this.config.clientId}`,
      JSON.stringify(result.data)
    )

    return this.tokens;
  }

  private getTokens() {
    const tokens = localStorage.getItem(`flexin-${this.config.clientId}`) || '';

    if (!tokens) {
      return;
    }

    const data = JSON.parse(tokens);
    return new ClientOAuth2.Token(this.authClient, data)
  }
}

export default AuthClient;
