// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(
//     new URL("http://localhost:3000/about"),
//     request.url
//   );
// }

import { auth } from "@/lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

///S1. -> export middleware as auth which will serve as session and give us info about the user if login.

///S2. -> Go to auth.js and call a callback in authconfig named authorized with 2 arguments, auth and request, where auth is ||| to session, so check for sessio.user, if it's there no need of activating middleware else activate middleware.
