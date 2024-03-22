import { z } from "zod"

export const formSchema = z.object({
    Nickname: z.string({ required_error: "Nickname is required" }).min(1, { message: "Nickname is required" }).regex(new RegExp('^(?=.{1,50}$)[\\w\\s\\-_,.&:;()\'"\']+'), { message: "Must be a valid nickname" }).max(50, { message: "Nickname must not exceed 50 characters" }),
});

export type NicknameEditFormSchema = typeof formSchema;

export class NicknameEditForm {
    public Nickname: string = "";
}