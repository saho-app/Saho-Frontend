import { RegisterForm, formSchema as registerFormSchema } from "$lib/components/ui/RegisterForm/schema";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { BackendURL } from "$lib";
import { ZodError } from "zod";
import { LoginForm, formSchema as loginFormSchema } from "$lib/components/ui/LoginForm/schema";
import type { PageServerLoad } from "../../(authenticated)/$types";

let redirectTo: string;
export const load: PageServerLoad = async (event) => {
    if (event.locals.Auth.IsValid()) {
        throw redirect(302, "/")
    }

    redirectTo = `/${(event.url.searchParams.get("redirectTo") ?? "/").slice(1)}`;
    const message = event.url.searchParams.get("message");
    return { message }
}

export const actions: Actions = {
    register: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());
        let form: RegisterForm = new RegisterForm;
        try {
            form = registerFormSchema.parse(formData);
            const response = await fetch(`${BackendURL}/auth/new`, { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
            if (!response.ok) { // conflict
                return fail(400, {
                    form: { Email: formData.Email, Login: formData.Login },
                    errors: {
                        fieldErrors: { Email: ["This email is already taken"], Login: ["This login is already taken"] }
                    }
                });
            }
            const token = await (await fetch(`${BackendURL}/auth`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Login: formData.Login, Password: formData.Password }) })).json()
            event.cookies.set("token", token, { path: "/", httpOnly: true, maxAge: 3600 * 24 * 7 - 60, secure: true })
        } catch (err) {
            if (err instanceof ZodError) {
                return fail(400, {
                    form: { Email: formData.Email, Login: formData.Login },
                    errors: err.flatten()
                });
            }
        }


        return redirect(302, redirectTo)
    },
    login: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());
        let form = new LoginForm;
        let token: string = "";
        try {
            form = loginFormSchema.parse(formData);
            const response = await fetch(`${BackendURL}/auth`, { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
            if (response.ok) {
                token = await response.json();
                event.cookies.set("token", token, { path: "/", httpOnly: true, maxAge: 3600 * 24 * 7 - 60, secure: true })
            } else {
                return fail(400, {
                    form: { Login: formData.Login },
                    errors: {
                        fieldErrors: {
                            Password: ["This pair of login and password was not found in our system"],
                        }
                    }
                });
            }
        } catch (err) {
            if (err instanceof ZodError) {
                return fail(400, {
                    form: { Login: formData.Login },
                    errors: err.flatten()
                });
            }
        }

        return redirect(303, redirectTo);
    }
};

