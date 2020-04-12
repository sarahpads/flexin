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
  }

  login() {
    var uri = this.authClient.code.getUri()

    window.location.assign(uri);
  }

  consume() {
    return this.authClient.code.getToken(window.location.href)
      .then((result) => {
        const { access_token, id_token } = result.data;
        const tokens = { access_token, id_token };

        this.storeTokens(tokens);
      })
      .catch((error) => console.log(error));

  }

  getUser() {
    if (!this.tokens.id_token) {
      return;
    }

    // user.sub is id
    // https://developers.google.com/identity/protocols/oauth2/openid-connect#an-id-tokens-payload
    return jwtDecode(this.tokens.id_token);
  }

  getAccessToken() {
    return this.tokens?.access_token;
  }

  getIdToken() {
    return this.tokens?.id_token;
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
