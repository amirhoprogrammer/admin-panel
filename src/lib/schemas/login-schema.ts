import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "ایمیل را وارد نکرده‌اید")
    .email("فرمت ایمیل صحیح نیست"),

  password: z
    .string()
    .min(1, "رمز عبور را وارد نکرده‌اید")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
