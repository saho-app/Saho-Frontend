import { z } from "zod"

export const formSchema = z.object({
    Login: z.string({ required_error: "Login is required" }).min(1, {message: "Login is required"}),
    Password: z.string({required_error: "Password is required"}).min(1, {message: "Password is required"})
});

export type LoginFormSchema = typeof formSchema;

export class LoginForm {
    public Login: string = "";
    public Password: string = "";
}