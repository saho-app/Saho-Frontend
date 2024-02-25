import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("api/users/");
    const users = await response.json()

    return { users };
}

export const actions: Actions = {
    deleteUser: async ({ request }) => {
        const userId = (await request.formData()).get("id");
        if (!userId) {
            return {sucess: false};
        }
        const res = await fetch(`http://127.0.0.1:5003/users/${userId}/`, {method: "DELETE"});
        return { success: res.status === 204 };
    },
    createUser: async ({ request }) => {
        const data = await request.formData();
        const nickname = data.get("nickname");
        if (!nickname) {
            return {success: false, missing: true}
        }
        const res = await fetch(`http://127.0.0.1:5003/users`, {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({Nickname: nickname, RoleId: 1})})

        return { success: res.status === 201 }
    },
}