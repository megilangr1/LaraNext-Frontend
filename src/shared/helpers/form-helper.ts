import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { doAlert } from "../components/do-alert";
import { ErrorResponse, ValidationError } from "../types/api-response";
import { mutate } from "swr";
import { useState } from "react";
import { fetchClient } from "./client-fetcher";

// Reusable submitter hook
interface FormSubmitProps<TData extends FieldValues, TResult> {
  form: UseFormReturn<TData>;

  // URL Route Handler Fetch
  url: string;

  // Method Fetch
  method?: "POST" | "PUT" | "PATCH";

  // Reset Fetch On Success
  resetOnSuccess?: boolean;

  // Revalidate SWR route
  mutateUrl?: string | string[];

  // Extend Payload Data
  extendData?: Record<string, unknown>;

  // On Success Event
  onSuccess?: (result: TResult) => void;

  dirtyOnly?: boolean;

  isEditMode?: boolean;

  allowedEmpty?: string[];
}

export function useFormSubmit<TData extends FieldValues, TResult = unknown>({
  form,
  url,
  method = "POST",
  resetOnSuccess = true,
  mutateUrl,
  extendData,
  onSuccess,
  dirtyOnly,
  isEditMode,
  allowedEmpty,
}: FormSubmitProps<TData, TResult>) {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: TData) => {
    try {
      setIsLoading(true);

      const formData: Record<string, unknown> = {
        ...(dirtyOnly ? getDirtyValues(form) : data),
        ...extendData,
      };

      const isMultipart = hasFileDeep(formData);
      const cleanUp = !isMultipart
        ? cleanPayload(formData, allowedEmpty)
        : formData;
      const payload = isMultipart ? convertToFormData(formData) : cleanUp;

      const req = await fetchClient(url, {
        method,
        body: payload,
      });

      if (!req.success) {
        handleFormError({ res: req, status: Number(req.code) ?? 500, form });
        return;
      }

      if (resetOnSuccess) form.reset();

      if (mutateUrl) {
        if (Array.isArray(mutateUrl)) {
          mutateUrl.forEach((url) => mutate(url));
        } else {
          mutate((key) => typeof key === "string" && key.startsWith(mutateUrl));
        }
      }

      doAlert(2, req.message);
      if (onSuccess) onSuccess(req.result as TResult);
    } catch {
      doAlert(0, "Terjadi Kesalahan ! Silahkan Hubungi Administrator !");
    } finally {
      setIsLoading(false);
    }
  };

  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;
  const isDirtyEdit = isEditMode && !isDirty;

  return { isLoading, submit, isDirtyEdit };
}

// Error handler
export function handleFormError<TData extends FieldValues>({
  res,
  status,
  form,
  customAction,
}: {
  res: ErrorResponse;
  status: number;
  form: UseFormReturn<TData>;
  customAction?: () => void;
}) {
  switch (status) {
    case 422:
      assignFormMessage(res.errors as ValidationError, form);
      break;
    case 401:
      if (res.errors != null)
        assignFormMessage(res.errors as ValidationError, form);
      break;
    default:
      doAlert(
        0,
        `Terjadi Kesalahan, Silahkan Hubungi Administrator! | ${res.message}`,
      );
      break;
  }

  customAction?.();
}

function assignFormMessage<TData extends FieldValues>(
  errors: ValidationError,
  form: UseFormReturn<TData>,
) {
  Object.entries(errors).forEach(([field, message]) => {
    form.setError(field as Path<TData>, {
      message: message[0],
    });
  });
}

// Utility untuk validasi
export function hasFileDeep(data: unknown): boolean {
  if (data instanceof File) return true;

  if (Array.isArray(data)) {
    return data.some(hasFileDeep);
  }

  if (typeof data === "object" && data !== null) {
    return Object.values(data).some(hasFileDeep);
  }

  return false;
}

export function convertToFormData(
  data: Record<string, unknown>,
  formData = new FormData(),
  parentKey = "",
): FormData {
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;

    const finalKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File) {
      formData.append(finalKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${finalKey}[${index}]`;
        if (item instanceof File) {
          // foto[0]
          // formData.append(arrayKey, item);

          // foto
          formData.append(finalKey, item);
        } else if (typeof item === "object" && item !== null) {
          convertToFormData(
            item as Record<string, unknown>,
            formData,
            arrayKey,
          );
        } else {
          formData.append(arrayKey, String(item));
        }
      });
    } else if (typeof value === "object") {
      convertToFormData(value as Record<string, unknown>, formData, finalKey);
    } else {
      formData.append(finalKey, String(value));
    }
  }

  return formData;
}

type DirtyFields<T> = {
  [K in keyof T]?: T[K] extends FieldValues ? DirtyFields<T[K]> : boolean;
};

export function getDirtyValues<T extends FieldValues>(
  form: UseFormReturn<T>,
): Partial<T> {
  const dirtyFields = form.formState.dirtyFields as DirtyFields<T>;
  const allValues = form.getValues();

  const getDirty = (df: DirtyFields<T>, av: T): Partial<T> => {
    return (Object.keys(df) as (keyof T)[]).reduce((acc, key) => {
      if (df[key] === true) {
        acc[key] = av[key];
      } else if (df[key] && typeof df[key] === "object") {
        acc[key] = getDirty(
          df[key] as DirtyFields<T[typeof key] & FieldValues>,
          av[key] as T[typeof key] & FieldValues,
        ) as T[typeof key];
      }
      return acc;
    }, {} as Partial<T>);
  };

  return getDirty(dirtyFields, allValues);
}

export function cleanPayload<T extends Record<string, unknown>>(
  data: T,
  allowedEmpty: string[] = [],
): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length === 0) continue;

    // ❗ kalau field termasuk allowedEmpty → tetap kirim meskipun ""
    if (value === "" && allowedEmpty.includes(key)) {
      cleaned[key] = value;
      continue;
    }

    if (value === "" || value == null) continue;

    cleaned[key] = value;
  }
  return cleaned;
}
