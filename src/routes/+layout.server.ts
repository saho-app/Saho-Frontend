import { Auth, User } from "$lib";
import { handleAuthRedirect } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    return { user: await User.FromAuth(event.locals.Auth) }
}
