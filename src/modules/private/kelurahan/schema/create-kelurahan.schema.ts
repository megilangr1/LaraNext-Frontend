import z, { optionalField, stringField } from "@/shared/schemas/base.schema";

export const createKelurahanSchema = z.object({
  id_kecamatan: stringField({
    fieldName: "Kecamatan",
    min: 1,
  }),
  kode_kelurahan: stringField({
    fieldName: "Kode Kelurahan",
    min: 1,
    max: 10,
  }),
  nama_kelurahan: stringField({
    fieldName: "Nama Kelurahan",
    min: 1,
    max: 255,
  }),
  keterangan: optionalField(
    stringField({
      fieldName: "Keterangan",
    }),
  ),
});

export type CreateKelurahanForm = z.infer<typeof createKelurahanSchema>;
