import z from "@/shared/schemas/base.schema";

export const kecamatanSchema = z.object({
  uuid: z.uuid(),
  kode_kecamatan: z.string(),
  nama_kecamatan: z.string(),
  keterangan: z.string().optional(),
  nama_creator: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type Kecamatan = z.infer<typeof kecamatanSchema>;
