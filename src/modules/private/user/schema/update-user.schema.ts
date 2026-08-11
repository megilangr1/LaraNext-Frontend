import z, { optionalPasswordField } from "@/shared/schemas/base.schema";
import { baseUserSchema } from "./user.schema";

export const updateUserSchema = baseUserSchema
  .extend({
    password: optionalPasswordField({
      min: 8,
    }),
    password_confirmation: optionalPasswordField({
      min: 8,
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.password && !data.password_confirmation) return;

    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Kata sandi tidak cocok",
        path: ["password_confirmation"],
      });
    }
  });

export type UpdateUserForm = z.infer<typeof updateUserSchema>;
