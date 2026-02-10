import { NextResponse } from "next/server";
import Logout from "@/utils/logout";

export async function middleware(request, event) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    try {
        if (pathname.startsWith("/app") || pathname.startsWith("/login")) {
            if (token) {
                const apiResponsePromise = fetch(`${process.env.NEXT_PUBLIC_ABSOLUTE_API_URL}/account/authenticate`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }).then((res) => res.json());

                event.waitUntil(apiResponsePromise);

                const response = await apiResponsePromise;

                if (response?.success) {
                    const { userBlockStatus, userStatus } = response?.data?.user;

                    if (userBlockStatus === "yes" || userStatus === "inactive") {
                        await Logout();
                        return NextResponse.rewrite(new URL("/login", request.url));
                    }

                    if (pathname.startsWith("/app")) {
                        return NextResponse.next();
                    }

                    if (pathname.startsWith("/login")) {
                        return NextResponse.rewrite(new URL("/app", request.url));
                    }

                    return NextResponse.next();
                }
                else {
                    await Logout();
                    return NextResponse.rewrite(new URL("/login", request.url));
                }
            }
            if (pathname.startsWith("/app") || pathname.startsWith("/login")) {
                await Logout();
                return NextResponse.rewrite(new URL("/login", request.url));
            }
        }

        return NextResponse.next();
    }
    catch (error) {
        await Logout();
        return NextResponse.rewrite(new URL("/login", request.url));
    }
}