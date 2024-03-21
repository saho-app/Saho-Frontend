import type { Actions, PageServerLoad } from './$types';
import { BackendURL } from '$lib';
import { fail, redirect } from '@sveltejs/kit';
import { handleAuthRedirect } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
    const auth = event.locals.Auth;
    const resSongs = await event.fetch(`${BackendURL}/users/${auth.Id}/songs`);
    const songs = await resSongs.json();

    return { songs };
};

export const actions: Actions = {
    createSong: async ({ request, fetch }) => {
        const data = Object.fromEntries(await request.formData());
        const body = { Title: data.Title, IsPrivate: data.IsPrivate === 'true', HasCover: false }
        const res = await fetch(`${BackendURL}/songs`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

        if (res.ok) {
            return {}
        }

        return fail(400, { message: await res.json() })
    },
    likeSong: async ({ request, fetch }) => {
        const data = Object.fromEntries(await request.formData())

        // validation

        const response = await fetch(`${BackendURL}/favorites/songs/${data.Id}`, { method: "POST" })
        if (response.ok) {
            return
        }
    },
    unlikeSong: async ({ request, fetch }) => {
        const data = Object.fromEntries(await request.formData())

        // validation

        const response = await fetch(`${BackendURL}/favorites/songs/${data.Id}`, { method: "DELETE" })
        if (response.ok) {
            return
        }
    },
    editSong: async ({ request, fetch }) => {
        const formData = Object.fromEntries(await request.formData())
        const body = { Title: formData.Title, IsPrivate: formData.IsPrivate == 'true', HasCover: false }
        // validation
        const response = await fetch(`${BackendURL}/songs/${formData.Id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        if (response.ok) {
            return
        }
        return fail(400)
    },
    deleteSong: async ({ request, fetch }) => {
        const formData = Object.fromEntries(await request.formData())
        const response = await fetch(`${BackendURL}/songs/${formData.Id}`, { method: "DELETE" })
        if (response.ok) {
            return
        }
        return fail(400)
    }
}