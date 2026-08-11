import z from "@/shared/schemas/base.schema";
import { kecamatanSchema } from "@/modules/private/kecamatan/schema/kecamatan.schema";

export const kelurahanSchema = z.object({
  uuid: z.string(),
  kode_kelurahan: z.string(),
  nama_kelurahan: z.string(),
  keterangan: z.string().optional(),
  kecamatan: kecamatanSchema.optional(),
  nama_creator: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Kelurahan = z.infer<typeof kelurahanSchema>;
