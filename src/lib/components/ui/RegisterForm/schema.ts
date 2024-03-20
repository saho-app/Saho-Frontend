import { z } from "zod"

export const formSchema = z.object({
    Email: z.string({ required_error: "Email is required" }).min(1, { message: "Email is required" }).email({ message: "Must be a valid email" }).max(50, { message: "Email must not exceed 50 characters" }),
    Login: z.string({ required_error: "Login is required" }).max(50, { message: "Must not exceed 50 characters" }).min(1, "Login is required").regex(new RegExp(`^[a-zA-Z0-9]+$`), { message: "May contain only letters and numbers" }),
    Password: z.string({ required_error: "Password is required" }).min(8, { message: "Must have at least 8 characters " }).max(50, { message: "Must not exceed 50 characters" }).regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), { message: "Must have at least 1 letter and 1 number" }),
    PasswordConfirm: z.string({ required_error: "Confirmation is required" }).min(8, { message: "Must have at least 8 characters " }).max(50, { message: "Must not exceed 50 characters" }).regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), { message: "Must have at least 1 letter and 1 number" }),
}).superRefine(({ Password, PasswordConfirm }, ctx) => {
    if (Password != PasswordConfirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords must match",
            path: ["Password"]
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords must match",
            path: ["PasswordConfirm"]
        });
    }
});

export type RegisterFormSchema = typeof formSchema;

export class RegisterForm {
    public Email: string = "";
    public Login: string = "";
    public Password: string = "";
    public PasswordConfirm: string = "";
}