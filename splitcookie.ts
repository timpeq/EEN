// I don't trust this function, and I might not even need it.  It's a hacked up
// combination of un-cited sources, so I'm keeping this as a separately imported
// file as a reminder to fix or replace.

export function splitCookie(cookie: string, key: string): string {
  let outCookie = "";
  const c = cookie.match(`(?:(?:^|.*; *)${key} *= *([^;]*).*$)|^.*$`);
  //if (c) console.debug("This is a spread of c", {...c})

  c?.forEach((element) => {
    outCookie = c[1];
  });
  return outCookie;
}