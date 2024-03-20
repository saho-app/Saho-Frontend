import { Auth } from "$lib";
import { handleAuthRedirect } from "$lib/utils";
import { redirect, type Handle, type HandleFetch } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    event.locals.Auth = Auth.FromCookie(event.cookies);
    if (!event.locals.Auth.IsValid() && !event.url.href.includes('auth')) {
        throw redirect(302, handleAuthRedirect(event))
    }

    return await resolve(event);
}

export const handleFetch: HandleFetch = async ({event, request, fetch}) => {
    if (!request.url.includes("auth")) {
        request.headers.set("Authorization", `Bearer ${event.cookies.get('token')}`)
    }

    return fetch(request);
}