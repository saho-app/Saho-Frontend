import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({fetch}) => {
    const resUsers = await fetch("api/users")
    const resAlbums = await fetch("api/albums")
    const users = await resUsers.json();
    const albums = await resAlbums.json();

    return { users, albums };
});

export const actions: Actions = {
    createAlbum: async ({ request }) => {
        const data = await request.formData();
        const body = { Title: data.get("Title"), ArtistId: data.get("ArtistId") }
        const res = await fetch("http://127.0.0.1:5003/albums", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

        return { success: res.status === 201 }
    },
    deleteAlbum: async ({ request }) => {
        const id = (await request.formData()).get("id");
        const res = await fetch("http://127.0.0.1:5003/albums/" + id, { method: "DELETE" })

        return { success: res.status === 204 }
    }
}