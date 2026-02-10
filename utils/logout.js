import { destroyCookie, parseCookies } from "nookies";
import { ToastFunction } from "@/utils/response";

export default async function Logout(redirect) {
    try {
        const { token } = parseCookies();

        if (token) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/authentication/logout`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        }

        destroyCookie(null, "token");
        destroyCookie(null, "userId");
        destroyCookie(null, "firstName");
        destroyCookie(null, "lastName");
        destroyCookie(null, "middleName");
        destroyCookie(null, "email");

        window.location.href = "/login";
    }
    catch (error) {
        console.error(error?.message)
    }
}