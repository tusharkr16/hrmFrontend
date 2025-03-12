import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.nextUrl;
    const token = req.cookies.get("token")?.value?.replace(/['"]+/g, "");

    const privateRoutes = ["/dashboard", "/profile", "/settings", "/protected/*"];
    const isPrivateRoute = privateRoutes.some((route) => url.pathname.startsWith(route));

    if (isPrivateRoute && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-pathname", url.pathname); 
    // console.log(response,"2@@@")
    return response;
}

export const config = {
    matcher: ["/:path*"], 
};
