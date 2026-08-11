import z, {
  arrayField,
  emailField,
  stringField,
} from "@/shared/schemas/base.schema";

export const userSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  email: z.email(),
  roles: z.array(z.string()),
  nama_creator: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const baseUserSchema = z.object({
  name: stringField({
    min: 1,
    max: 191,
    fieldName: "Nama",
  }),
  email: emailField(),
  roles: arrayField(
    stringField({
      fieldName: "Grup Akses Pengguna",
    }),
    {
      min: 1,
      fieldName: "Grup Akses Pengguna",
    },
  ),
});

export type User = z.infer<typeof userSchema>;
