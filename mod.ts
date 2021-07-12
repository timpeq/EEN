import { EENAuth, EENUser } from "./types.ts";
import { splitCookie } from './splitcookie.ts';

export class EEN {
  authKey = "";
  cookies: string[] = [];
  private auth: EENAuth;
  user: EENUser = {};

  private get Host() {
    return `https://${this.user.active_brand_subdomain}.${this.auth.baseHost}`;
  }
  private get loginHost() {
    return `https://login.${this.auth.baseHost}`;
  }

  constructor(auth: EENAuth) {
    this.auth = auth;
  }

  async isAuth():Promise<boolean> {


    const isAuthReqHeaders = new Headers();
    this.cookies.forEach(element => {
      isAuthReqHeaders.append("cookie", element)
    });

    const isAuthReq:RequestInit = {
      method: "get",
      headers: isAuthReqHeaders
    }
    
    const isAuthResp = await fetch(
      `${this.loginHost}/g/aaa/isauth`,
      isAuthReq
    );

    if (isAuthResp.status == 200) return true;
    else if (isAuthResp.status == 401) return false;
    else {
      throw `Unexpected isAuth response code: ${isAuthResp.status} ${isAuthResp.statusText}`
    }
}

  async authenticate(): Promise<string> {
    if (!this.auth.username) {
      throw "Authenticate Failure: No Username Specified";
    }
    if (!this.auth.password) {
      throw "Authenticate Failure: No Password Specified";
    }

    const authenticateBody = new FormData();
    authenticateBody.append("username", this.auth.username);
    authenticateBody.append("password", this.auth.password);

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

    // Extract 'auth_key' from
    this.cookies = [];
    authorizeResp.headers.forEach((element, index) => {
      if (index == "set-cookie") {
        this.cookies.push(element.toString());
        this.authKey = splitCookie(element.toString(), "auth_key");
      }
    });

    return true;
  }
}
