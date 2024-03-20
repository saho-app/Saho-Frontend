import { BackendURL } from '$lib';
import { handleAuthRedirect } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
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