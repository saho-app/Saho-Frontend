import { BackendURL } from '$lib';
import { handleAuthRedirect } from '$lib/utils';
import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const auth = event.locals.Auth;
    const avatarResponse = await event.fetch(`${BackendURL}/storage/users/${auth.Id}/avatar`);
    const accountInfoResponse = await event.fetch(`${BackendURL}/users/me/extended`);
    const blob = await avatarResponse.blob();

    return {
        blob: {
            data: Buffer.from(await blob.arrayBuffer()).toString('base64'),
            mime: avatarResponse.headers.get('content-type') ?? "image/png"
        },
        accountInfo: await accountInfoResponse.json()
    };
};

export const actions: Actions = {
    "uploadAvatar": async (event) => {
        const formData = await event.request.formData();
        if (!formData.get("picture")) {
            return error(400, { message: "No file selected" })
        }

        const res = await event.fetch(`${BackendURL}/users/picture`, { method: "PUT", body: formData });
        if (!res.ok) {
            return error(res.status, res.status.toString())
        }
    }
}