import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"
import { BackendURL } from "$lib";

let token: string | undefined;

export const load: PageServerLoad = async ({ cookies }) => {
    token = cookies.get("token")
    if (!token) {
        redirect(303, "/auth")
    }
    const response = await fetch(BackendURL + "/users/", { headers: { "Authorization": "Bearer " + token } });
    const users = await response.json()

    return { users };
}

export const actions: Actions = {
    deleteUser: async ({ request, cookies }) => {
        const token = cookies.get("token")
        if (!token) {
            redirect(303, "/auth")
        }
        const userId = (await request.formData()).get("id");
        if (!userId) {
            return { sucess: false };
        }
        const res = await fetch(`${BackendURL}/${userId}/`, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
        return { success: res.status === 204 };
    },
    createUser: async ({ request }) => {
        const data = await request.formData();
        const nickname = data.get("nickname");
        if (!nickname) {
            return { success: false, missing: true }
        }
        const res = await fetch(`${BackendURL}/users`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ Nickname: nickname, RoleId: 1 }) })

        return { success: res.status === 201 }
    },
}