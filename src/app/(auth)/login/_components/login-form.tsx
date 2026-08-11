"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  loginSchema,
  type LoginSchema,
} from "@/modules/auth/schema/login.schema";
import { useState } from "react";
import { MainRes } from "@/shared/types/api-response";
import { handleFormError } from "@/shared/helpers/form-helper";
import { User } from "@/modules/private/user/schema/user.schema";
import { doAlert } from "@/shared/components/do-alert";
import { useRouter } from "next/navigation";
import useAuth from "@/modules/auth/store/auth-store";
import Link from "next/link";

const defaultValues: LoginSchema = {
  email: "admin@mail.com",
  password: "admin123",
};

const LoginForm = () => {
  const router = useRouter();
  const { clearSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);

    try {
      const doLogin = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const res: MainRes<User> = await doLogin.json();
      if (!res.success) {
        handleFormError({
          res,
          status: doLogin.status,
          form,
        });
        return;
      }
      doAlert(1, res.message);
      await clearSession();

      router.refresh();
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center mb-6">
          <h1 className="text-2xl font-bold">Login Aplikasi</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Silahkan masukan informasi akun pengguna
          </p>
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                aria-invalid={fieldState.invalid}
                disabled={isLoading}
                required
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
              </div>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                disabled={isLoading}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </Field>
        <Link href={"/"}>
          <FieldSeparator>Kembali ke-Halaman Utama</FieldSeparator>
        </Link>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
