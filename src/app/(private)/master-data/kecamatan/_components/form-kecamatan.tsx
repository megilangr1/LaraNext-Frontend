"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ReqMark from "@/shared/components/form/req-mark";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFormSubmit } from "@/shared/helpers/form-helper";
import { useRouter } from "next/navigation";
import { Check, PenLine, Undo } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/shared/helpers/client-fetcher";
import LoadingScreen from "@/shared/components/loading-screen";
import PageError from "@/shared/components/errors/page-error";
import { Textarea } from "@/components/ui/textarea";
import { updateKecamatanSchema } from "@/modules/private/kecamatan/schema/update-kecamatan.schema";
import {
  CreateKecamatanForm,
  createKecamatanSchema,
} from "@/modules/private/kecamatan/schema/create-kecamatan.schema";
import { Kecamatan } from "@/modules/private/kecamatan/schema/kecamatan.schema";

const defaultValues: CreateKecamatanForm = {
  kode_kecamatan: "",
  nama_kecamatan: "",
  keterangan: "",
};

interface FormKecamatanProps {
  id?: string;
}

const FormKecamatan = ({ id }: FormKecamatanProps) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(id ? updateKecamatanSchema : createKecamatanSchema),
    defaultValues,
  });

  const { isLoading, submit, isDirtyEdit } = useFormSubmit({
    form,
    url: id ? `/api/master-data/kecamatan/${id}` : `/api/master-data/kecamatan`,
    method: id ? "PATCH" : "POST",
    mutateUrl: "/api/master-data/kecamatan",
    onSuccess: () => router.push("/master-data/kecamatan"),
    dirtyOnly: id ? true : false,
    isEditMode: !!id,
    allowedEmpty: ["keterangan"],
  });

  const isSubmitDisabled = isLoading || isDirtyEdit;

  // When Edit Data Logic
  const {
    data: editData,
    error: editError,
    isLoading: editLoading,
  } = useSWR<Kecamatan>(
    id ? `/api/master-data/kecamatan/${id}` : null,
    fetcher,
  );

  useEffect(() => {
    if (editData) {
      form.reset({
        kode_kecamatan: editData.kode_kecamatan,
        nama_kecamatan: editData.nama_kecamatan,
        keterangan: editData.keterangan,
      });
    }
  }, [editData, form]);
  // End When Edit Data Logic

  const handleReset = () => {
    if (id && editData) {
      form.reset({
        kode_kecamatan: editData.kode_kecamatan,
        nama_kecamatan: editData.nama_kecamatan,
        keterangan: editData.keterangan,
      });
    } else {
      form.reset(defaultValues);
    }
  };

  // After Everything
  const isFetching = editLoading;
  const error = editError;

  if (isFetching) return <LoadingScreen />;
  if (error)
    return (
      <PageError
        error={error}
        reset={() => router.refresh()}
        mutateUrl={`/api/master-data/kecamatan/${id}`}
      />
    );

  return (
    <div className="flex flex-col gap-2">
      <Card className="p-0 gap-0">
        <CardHeader className="border-b-2 px-4 py-3">
          <CardTitle>Form {editData ? "Edit" : "Tambah"} Kecamatan</CardTitle>
          <CardDescription>
            Silahkan lengkapi informasi kecamatan
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={form.handleSubmit(submit)}>
            <FieldSet>
              <FieldGroup className="flex flex-col gap-2 px-4">
                <div className="w-full flex flex-col gap-2 pt-2">
                  <h5 className="font-semibold text-base">Informasi Utama :</h5>

                  <hr className="border-t-2 mb-1" />
                </div>

                <div className="grid grid-cols-12 gap-2 px-2">
                  <Controller
                    control={form.control}
                    name="kode_kecamatan"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>
                          Kode Kecamatan : <ReqMark />
                        </FieldLabel>

                        <Input
                          {...field}
                          type="text"
                          id="kode_kecamatan"
                          aria-invalid={fieldState.invalid}
                          placeholder="ex. 010"
                          autoComplete="off"
                          disabled={isLoading}
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="nama_kecamatan"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>
                          Nama Kecamatan : <ReqMark />
                        </FieldLabel>

                        <Input
                          {...field}
                          type="text"
                          id="nama_kecamatan"
                          aria-invalid={fieldState.invalid}
                          placeholder="ex. Warudoyong"
                          autoComplete="off"
                          disabled={isLoading}
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="keterangan"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-12 lg:col-span-12 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>Keterangan :</FieldLabel>

                        <Textarea
                          {...field}
                          id="desc"
                          aria-invalid={fieldState.invalid}
                          placeholder="ex. kecamatan warudoyong kota sukabumi"
                          autoComplete="off"
                          disabled={isLoading}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            <hr className="border-t-2 my-3 md:mx-2" />

            <div className="grid grid-cols-12 gap-2 px-4 pb-3">
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitDisabled}
                >
                  {editData ? (
                    <PenLine className="shrink-0 size-4" />
                  ) : (
                    <Check className="shrink-0 size-4" />
                  )}
                  {editData ? "Simpan Data" : "Buat Data"}
                </Button>
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                <Button
                  type="button"
                  className="w-full"
                  variant={"destructive"}
                  disabled={isLoading}
                  onClick={handleReset}
                >
                  <Undo className="shrink-0 size-4" />
                  Reset Input
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-slate-100 border-t-2 px-4 py-2">
          <div className="w-full flex items-center justify-end font-semibold tracking-wider">
            Form Kecamatan
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormKecamatan;
