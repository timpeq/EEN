import { EENAccount, EENAuth, EENUser } from "./types.ts";

export class EEN {
  authKey = "";
  cookies: string[] = [];
  private auth: EENAuth;
  user: EENUser = {};

  constructor(auth: EENAuth) {
    this.auth = auth;
  }

  private get host() {
    return `https://${this.user.active_brand_subdomain}.${this.auth.baseHost}`;
  }
  private get loginHost() {
    return `https://login.${this.auth.baseHost}`;
  }
  private get requestHeaders(){
    const headers = new Headers();
    this.cookies.forEach((element) => {
      headers.append("cookie", element);
    });
    return headers;
  }

  /**
   * Submit user/pass to retrieve intermediate token required by
   * authorize in login process, normally called by logIn()
   *
   * @returns Promise
   */
  async authenticate(auth: EENAuth): Promise<string> {
    if (!this.auth.username) {
      throw "Authenticate Failure: No Username Specified";
    }
    if (!this.auth.password) {
      throw "Authenticate Failure: No Password Specified";
    }

    const authenticateBody = new FormData();
    authenticateBody.append("username", auth.username);
    authenticateBody.append("password", auth.password);

    const authenticateResp = await fetch(
      `${this.loginHost}/g/aaa/authenticate`,
      {
        method: "post",
        body: authenticateBody,
      },
    );

    if (authenticateResp.status != 200) {
      throw `Authenticate Response ${authenticateResp.status}: ${authenticateResp.statusText}`;
    }

    const authenticateRespBody = await authenticateResp.json();
    return authenticateRespBody["token"];
  }

  /**
   * Submit token to receive valid cookies and logged-in user object.
   * @param {string} token - Token received from 
   * @returns Promise which resolves boolean value of authorization success
   */
  async authorize(token: string): Promise<boolean> {
    const authorizeBody = new FormData();
    authorizeBody.append("token", token);

    let authorizeResp: Response;

    try {
      authorizeResp = await fetch(`${this.loginHost}/g/aaa/authorize`, {
        method: "post",
        body: authorizeBody,
      });
    } catch (error) {
      console.log("Authorization Error", error);
      return false;
    }

    const authorizeRespBody = await authorizeResp.json();
    this.user = { ...authorizeRespBody };

    this.cookies = [];

    authorizeResp.headers.forEach((element, index) => {
      if (index == "set-cookie") this.cookies.push(element.toString());
    });
    
    return true;
  }

  async logIn():Promise<boolean> {
    const token = await this.authenticate(this.auth);
    const authorized = await this.authorize(token);
    if (authorized === true) return true;
    else return false;
  }

  /**
   * Checks if session is valid
   * 
   * @returns Promise boolean
   */
  async isAuth(): Promise<boolean> {
    const isAuthResp = await fetch(
      `${this.loginHost}/g/aaa/isauth`,
      {
        method: "get",
        headers: this.requestHeaders,
      },
    );

    if (isAuthResp.status == 200) return true;
    else if (isAuthResp.status == 401) return false;
    else {
      throw `Unexpected isAuth response code: ${isAuthResp.status} ${isAuthResp.statusText}`;
    }
  }

  async accountList(): Promise<EENAccount[]> {
    const accountListResp = await fetch(
      `${this.loginHost}/g/account/list`,
      {
        method: "get",
        headers: this.requestHeaders,
      },
    );

    if (accountListResp.status == 200) {
      let accounts: EENAccount[] = [];
      const accountListRespBody = await accountListResp.json();

      accounts = { ...accountListRespBody };
      return accounts;
    } else if (accountListResp.status == 401) return [];
    else {
      throw `Unexpected accountList response code: ${accountListResp.status} ${accountListResp.statusText}`;
    }
  }
}
