import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
    const resPlaylists = await fetch("api/playlists/");
    const resUsers = await fetch("api/users/");
    const playlists = await resPlaylists.json();
    const users = await resUsers.json();

    return { playlists, users }
});

export const actions: Actions = {
    createPlaylist: async ({ request }) => {
        const data = await request.formData();
        const body = { OwnerId: Number(data.get("OwnerId")), Title: data.get("Title"), IsPrivate: true }
        const res = await fetch("http://127.0.0.1:5003/playlists", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

        return { success: res.status === 201 }

    },
    deletePlaylist: async ({ request }) => {
        const id = (await request.formData()).get("id");
        const res = await fetch(`http://127.0.0.1:5003/playlists/${id}`, { method: "DELETE" })

        return { success: res.status === 204 }
    }
}
