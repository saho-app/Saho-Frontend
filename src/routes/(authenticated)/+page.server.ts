import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { handleAuthRedirect } from "$lib/utils";
import { Auth, User } from "$lib";

export const load: PageServerLoad = async (event) => {
    return { user: await User.FromAuth(event.locals.Auth) }
}