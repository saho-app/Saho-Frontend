import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
    const resSongs = await fetch("/api/songs");
    const resUsers = await fetch("/api/users");
    const songs = await resSongs.json();
    const users = await resUsers.json();

    return { songs, users };
});

export const actions: Actions = {
    createSong: async ({ request }) => {
        const data = await request.formData();
        const body = { Title: data.get("Title"), TimesPLayed: 0, ArtistId: Number(data.get("ArtistId")) }
        const res = await fetch("http://127.0.0.1:5003/songs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

        return { success: res.status === 201 }
    },
    deleteSong: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        if (!id) {
            return { success: false, missing: true }
        }
        const res = await fetch(`http://127.0.0.1:5003/songs/${id}`, { method: "DELETE" })

        return { success: res.status === 204 }
    },
}