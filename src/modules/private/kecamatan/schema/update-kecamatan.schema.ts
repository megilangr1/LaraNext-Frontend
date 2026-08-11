import z, { optionalField, stringField } from "@/shared/schemas/base.schema";

export const updateKecamatanSchema = z.object({
  kode_kecamatan: stringField({
    fieldName: "Kode Kecamatan",
    min: 1,
    max: 191,
  }),
  nama_kecamatan: stringField({
    fieldName: "Nama Kecamatan",
    min: 1,
    max: 191,
  }),
  keterangan: optionalField(
    stringField({
      fieldName: "Deskripsi",
    }),
  ),
});

export type UpdateKecamatanForm = z.infer<typeof updateKecamatanSchema>;
