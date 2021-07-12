import { EENAuth } from './types.ts';
import { EEN } from './mod.ts';

import "https://deno.land/x/dotenv@v2.0.0/load.ts";

const creds:EENAuth = {
  username: Deno.env.get("EEN_USER"),
  password: Deno.env.get("EEN_PASS"),
  baseHost: Deno.env.get("EEN_BASE_HOST"),
}

const een = new EEN(creds);
try {
  const token = await een.authenticate();
  const authorized = await een.authorize(token);
  console.log("Authorized?", authorized);
  console.log(`Logged In As ${een.user.first_name} ${een.user.last_name}`)
  console.log("Brand", een.user.active_brand_subdomain);
  console.log("Cookies", een.cookies);
  console.log("auth_key", een.authKey);
  const isAuth = await een.isAuth();
  console.log("isAuth?", isAuth);
}

catch (error) {
  console.log("Error Signing In:", error)
}
