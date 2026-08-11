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
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createUserSchema } from "@/modules/private/user/schema/create-user.schema";
import ReqMark from "@/shared/components/form/req-mark";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateUserSchema } from "@/modules/private/user/schema/update-user.schema";
import { useFormSubmit } from "@/shared/helpers/form-helper";
import { useRouter } from "next/navigation";
import { Check, PenLine, Undo } from "lucide-react";
import { User } from "@/modules/private/user/schema/user.schema";
import useSWR from "swr";
import { fetcher } from "@/shared/helpers/client-fetcher";
import LoadingScreen from "@/shared/components/loading-screen";
import PageError from "@/shared/components/errors/page-error";
import { Checkbox } from "@/components/ui/checkbox";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  roles: [],
};

interface FormUserProps {
  id?: string;
}

const FormUser = ({ id }: FormUserProps) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(id ? updateUserSchema : createUserSchema),
    defaultValues,
  });

  const { isLoading, submit, isDirtyEdit } = useFormSubmit({
    form,
    url: id ? `/api/master-data/users/${id}` : `/api/master-data/users`,
    method: id ? "PATCH" : "POST",
    mutateUrl: "/api/master-data/users",
    onSuccess: () => router.push("/master-data/users"),
    dirtyOnly: id ? true : false,
    isEditMode: !!id,
  });

  const isSubmitDisabled = isLoading || isDirtyEdit;

  // When Edit Data Logic

  const {
    data: dataUser,
    error: errorUser,
    isLoading: loadingUser,
  } = useSWR<User>(id ? `/api/master-data/users/${id}` : null, fetcher);

  // Set default values saat data user berhasil di-fetch
  useEffect(() => {
    if (dataUser) {
      form.reset({
        name: dataUser.name,
        email: dataUser.email,
        roles: dataUser.roles || [],
        password: "",
        password_confirmation: "",
      });
    }
  }, [dataUser, form]);

  const handleReset = () => {
    if (id && dataUser) {
      form.reset({
        name: dataUser.name,
        email: dataUser.email,
        roles: dataUser.roles || [],
        password: "",
        password_confirmation: "",
      });
    } else {
      form.reset(defaultValues);
    }
  };

  const {
    data: dataConfig,
    error: errorConfig,
    isLoading: loadingConfig,
  } = useSWR<string[]>(`/api/master-data/users/page-config`, fetcher);

  const isFetching = loadingConfig || (!!id && loadingUser);
  const error = errorConfig || errorUser;

  if (isFetching) return <LoadingScreen />;
  if (error)
    return (
      <PageError
        error={error}
        reset={() => router.refresh()}
        mutateUrl={`/api/master-data/users/${id}`}
      />
    );

  return (
    <div className="flex flex-col gap-2">
      <Card className="p-0 gap-0">
        <CardHeader className="border-b-2 px-4 py-3">
          <CardTitle>Form {dataUser ? "Perbarui" : "Buat"} Pengguna</CardTitle>
          <CardDescription>Silakan isi informasi pengguna</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={form.handleSubmit(submit)}>
            <FieldSet>
              <FieldGroup className="flex flex-col gap-2 px-4">
                <div className="w-full flex flex-col gap-2 pt-2">
                  <h5 className="font-semibold text-base">Informasi Dasar :</h5>

                  <hr className="border-t-2 mb-1" />
                </div>

                <div className="grid grid-cols-12 gap-2 px-2">
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>
                          Nama : <ReqMark />
                        </FieldLabel>

                        <Input
                          {...field}
                          type="text"
                          id="name"
                          aria-invalid={fieldState.invalid}
                          placeholder="cth. John Doe"
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
                </div>

                <div className="w-full flex flex-col gap-2 pt-2">
                  <h5 className="font-semibold text-base">
                    Informasi Autentikasi :
                  </h5>

                  <hr className="border-t-2 mb-1" />
                </div>

                <div className="grid grid-cols-12 gap-2 px-2">
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>
                          Email : <ReqMark />
                        </FieldLabel>

                        <Input
                          {...field}
                          type="email"
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="cth. pengguna@contoh.com"
                          autoComplete="email"
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
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>
                          Kata Sandi : <ReqMark />
                        </FieldLabel>

                        <Input
                          {...field}
                          type="password"
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Masukkan kata sandi yang kuat..."
                          autoComplete="new-password"
                          disabled={isLoading}
                          required={!dataUser}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="password_confirmation"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-start justify-start"
                      >
                        <FieldLabel>
                          Konfirmasi Kata Sandi :{id ? null : <ReqMark />}
                        </FieldLabel>

                        <Input
                          {...field}
                          type="password"
                          id="password_confirmation"
                          aria-invalid={fieldState.invalid}
                          placeholder={
                            id
                              ? "Konfirmasi kata sandi baru..."
                              : "Konfirmasi kata sandi..."
                          }
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

                <div className="w-full flex flex-col gap-2 pt-2">
                  <h5 className="font-semibold text-base">
                    Grup Akses Pengguna :
                  </h5>

                  <hr className="border-t-2 mb-1" />
                </div>

                <div className="w-full px-2">
                  <Controller
                    control={form.control}
                    name="roles"
                    render={({ field, fieldState }) => (
                      <FieldSet
                        data-invalid={fieldState.invalid}
                        className="col-span-6"
                      >
                        <FieldLegend variant="label" className="flex gap-2">
                          Grup Akses : <ReqMark />
                        </FieldLegend>

                        <FieldGroup
                          data-slot="checkbox-group"
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                        >
                          {dataConfig?.map((role, i) => (
                            <Field
                              key={i}
                              orientation={"horizontal"}
                              data-invalid={fieldState.invalid}
                              className="border px-3 py-2 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              <Checkbox
                                id={`role-${i}`}
                                name={field.name}
                                aria-invalid={fieldState.invalid}
                                checked={field.value.includes(role)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, role]
                                    : field.value.filter(
                                        (value) => value !== role,
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                              <FieldLabel
                                htmlFor={`role-${i}`}
                                className="font-normal cursor-pointer flex-1"
                              >
                                {role}
                              </FieldLabel>
                            </Field>
                          ))}
                        </FieldGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldSet>
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
                  {dataUser ? (
                    <PenLine className="shrink-0 size-4" />
                  ) : (
                    <Check className="shrink-0 size-4" />
                  )}
                  {dataUser ? "Perbarui Data" : "Buat Data"}
                </Button>
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                <Button
                  type="button"
                  className="w-full"
                  variant={"destructive"}
                  onClick={handleReset}
                  disabled={isLoading}
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
            Form Pengguna
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormUser;
