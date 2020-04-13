import ClientOAuth2 from 'client-oauth2';
import jwtDecode from 'jwt-decode';

class AuthClient {
  public config: ClientOAuth2.Options;
  public authClient: ClientOAuth2;
  public tokens: any;

  constructor(config: ClientOAuth2.Options) {
    this.config = config;
    this.authClient = new ClientOAuth2(config);
    this.tokens = this.getTokens();
    // silent renew
  }

  login() {
    debugger;
    const uri = this.authClient.code.getUri()

    window.location.assign(uri);
  }

  consume() {
    return this.authClient.code.getToken(window.location.href)
      .then((result) => {
        const { access_token, id_token, refresh_token } = result.data;
        const tokens = { access_token, id_token, refresh_token };
        console.log(result)

        this.storeTokens(tokens);
      })
      .catch((error) => console.log(error));

  }

  getSession() {
    if (!this.tokens.id_token) {
      return;
    }

    return jwtDecode(this.tokens.id_token);
  }

  getAccessToken() {
    return this.tokens?.access_token;
  }

  getIdToken() {
    return this.tokens?.id_token;
  }

  getRefreshToken() {
    return this.tokens?.refresh_token;
  }

  isTokenValid() {
    const session: any = this.getSession();

    return session && Date.now() < session.exp * 1000;
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(
      `flexin-${this.config.clientId}`,
      JSON.stringify(tokens)
    )
  }

  private getTokens() {
    const tokens = localStorage.getItem(`flexin-${this.config.clientId}`) || '';

    if (!tokens) {
      return;
    }

    return JSON.parse(tokens);
  }
}

export default AuthClient;
