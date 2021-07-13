import { EENAuth } from './types.ts';
import { EEN } from './mod.ts';

import "https://deno.land/x/dotenv@v2.0.0/load.ts";

const envUser = Deno.env.get("EEN_USER");
const envPass = Deno.env.get("EEN_PASS");
const baseHost = Deno.env.get("EEN_BASE_HOST")

const creds:EENAuth = {
  username: envUser ? envUser : "",
  password: envPass ? envPass : "",
  baseHost: baseHost ? baseHost : "",
}

const een = new EEN(creds);
try {
  const logIn = await een.logIn();
  if (logIn) console.log ("logIn result was", logIn)
  console.log(`Logged In As ${een.user.first_name} ${een.user.last_name}`)
  console.log("Brand", een.user.active_brand_subdomain);
  console.log("Cookies", een.cookies);
  const isAuth = await een.isAuth();
  console.log("isAuth?", isAuth);
}

catch (error) {
  console.log("Error Signing In:", error)
}
