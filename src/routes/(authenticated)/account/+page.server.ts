import { BackendURL } from '$lib';
import { handleAuthRedirect } from '$lib/utils';
import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { formSchema, NicknameEditForm } from '$lib/components/ui/NicknameEditForm/schema';
import { ZodError } from 'zod';

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
    uploadAvatar: async (event) => {
        const formData = await event.request.formData();
        if (!formData.get("picture")) {
            return fail(400, { message: "No file selected" })
        }

        const res = await event.fetch(`${BackendURL}/users/picture`, { method: "PUT", body: formData });
        if (!res.ok) {
            return fail(res.status, { message: res.status.toString() })
        }
    },
    deleteAvatar: async (event) => {
        const res = await event.fetch(`${BackendURL}/users/picture`, { method: 'DELETE' });
        if (!res.ok) {
            return fail(res.status, { message: res.status.toString() })
        }
    },
    updateNickname: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());
        let form = new NicknameEditForm();
        try {
            form = formSchema.parse(formData);
            const response = await event.fetch(`${BackendURL}/users/nickname`, { method: "PATCH", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
            if (!response.ok) { // conflict
                return fail(400, {
                    form: { Nickname: form.Nickname },
                    errors: {
                        fieldErrors: { Nickname: ["This nickname is already taken"] }
                    }
                });
            }
        } catch (err) {
            if (err instanceof ZodError) {
                return fail(400, {
                    form: { Nickname: form.Nickname },
                    errors: err.flatten()
                });
            }
        }
    },
    becomeArtist: async (event) => {
        const res = await event.fetch(`${BackendURL}/users/makeArtist`);
        if (res.ok) {
            if (res.status === 200) {
                const token = await res.json();
                event.cookies.set('token', token, { path: '/', httpOnly: true, secure: true });
            }
            return;
        }

        return fail(res.status)
    },
}