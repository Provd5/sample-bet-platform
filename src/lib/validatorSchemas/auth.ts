import { z } from "zod";

export type loginSchemaType = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  email: z.string().email({ message: "Podany adres jest niepoprawny" }),
  password: z.string().min(1, { message: "Podaj hasło" }),
});

export type registerSchemaType = z.infer<typeof registerSchema>;
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Nazwa musi mieć co najmniej 3 znaki" }),
  email: z.string().email({ message: "Podany adres jest niepoprawny" }),
  password: z
    .string()
    .min(6, { message: "Hasło powinno mieć przynajmniej 6 znaków" }),
  repeat_password: z.string().min(1, { message: "Powtórz hasło" }),
});
