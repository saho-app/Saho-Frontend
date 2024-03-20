import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ cookies }) => {
        cookies.delete("token", { path: "/" })
        return redirect(303, "/auth");
    }
}