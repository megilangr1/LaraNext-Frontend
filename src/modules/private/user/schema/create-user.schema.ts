import z, { passwordField } from "@/shared/schemas/base.schema";
import { baseUserSchema } from "./user.schema";

export const createUserSchema = baseUserSchema
  .extend({
    password: passwordField({ min: 8 }),
    password_confirmation: passwordField({ min: 8 }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Kata sandi tidak cocok",
    path: ["password_confirmation"],
  });

export type CreateUserForm = z.infer<typeof createUserSchema>;
