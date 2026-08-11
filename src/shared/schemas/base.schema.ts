import * as z from "zod";

/**
 * Validation Messages - Inspired by Laravel validation messages
 * Centralized untuk consistency dan easy maintenance
 */

const createRequiredMessage = (field: string) => `${field} wajib diisi.`;
const createMinMessage = (field: string, value: number) =>
  `${field} harus minimal ${value} karakter.`;
const createMaxMessage = (field: string, value: number) =>
  `${field} tidak boleh melebihi ${value} karakter.`;
const createLengthMessage = (field: string, value: number) =>
  `${field} harus tepat ${value} karakter.`;
const createRegexMessage = (field: string) => `Format ${field} tidak valid.`;

export const VALIDATION_MESSAGES = {
  // Required messages
  required: (field: string) => createRequiredMessage(field),
  requiredIf: (field: string, condition: string) =>
    `${field} wajib diisi ketika ${condition}.`,

  // String messages
  string: (field: string) => `${field} harus berupa teks.`,
  min: (field: string, value: number) => createMinMessage(field, value),
  max: (field: string, value: number) => createMaxMessage(field, value),
  length: (field: string, value: number) => createLengthMessage(field, value),
  regex: (field: string) => createRegexMessage(field),

  // Email messages
  email: (field: string = "Email") =>
    `${field} harus berupa alamat email yang valid.`,
  emailUnique: (field: string = "Email") =>
    `${field} sudah digunakan sebelumnya.`,

  // Number messages
  number: (field: string) => `${field} harus berupa angka.`,
  integer: (field: string) => `${field} harus berupa bilangan bulat.`,
  positive: (field: string) => `${field} harus lebih besar dari 0.`,
  greaterThan: (field: string, value: number) =>
    `${field} harus lebih besar dari ${value}.`,
  lessThan: (field: string, value: number) =>
    `${field} harus kurang dari ${value}.`,
  minNumber: (field: string, value: number) =>
    `${field} harus minimal ${value}.`,
  maxNumber: (field: string, value: number) =>
    `${field} tidak boleh melebihi ${value}.`,

  // Array/Select messages
  selectRequired: (field: string) => `Pilihan ${field} wajib dipilih.`,
  arrayMin: (field: string, value: number) =>
    `Anda harus memilih minimal ${value} ${field}.`,
  arrayMax: (field: string, value: number) =>
    `Anda tidak boleh memilih lebih dari ${value} ${field}.`,
  arrayLength: (field: string, value: number) =>
    `${field} harus memiliki tepat ${value} item.`,

  // Password messages
  passwordWeak: () =>
    "Kata sandi harus berisi minimal satu huruf besar, satu huruf kecil, satu angka, dan satu karakter spesial.",
  passwordMismatch: () => "Konfirmasi kata sandi tidak cocok.",

  // URL messages
  url: (field: string = "URL") => `${field} harus berupa URL yang valid.`,

  // Date messages
  date: (field: string = "Date") => `${field} harus berupa tanggal yang valid.`,
  dateMin: (field: string, value: string) =>
    `${field} harus pada atau setelah ${value}.`,
  dateMax: (field: string, value: string) =>
    `${field} harus pada atau sebelum ${value}.`,

  // Phone messages
  phone: (field: string = "Nomor telepon") =>
    `${field} harus berupa nomor telepon yang valid.`,

  // Generic messages
  invalid: (field: string) => `${field} tidak valid.`,
  notFound: (field: string) => `${field} tidak ditemukan.`,

  // Additional Laravel-like messages
  accepted: (field: string) => `${field} harus diterima.`,
  numeric: (field: string) => `${field} harus berupa angka.`,
  between: (field: string, min: number, max: number) =>
    `${field} harus antara ${min} dan ${max}.`,
  array: (field: string) => `${field} harus berupa array.`,

  // File validation messages
  fileRequired: (field: string) => `File ${field} wajib diupload.`,
  fileSize: (field: string, maxSize: number) =>
    `${field} tidak boleh melebihi ${maxSize}MB.`,
  fileMime: (field: string, allowedTypes: string[]) =>
    `${field} harus salah satu dari tipe berikut: ${allowedTypes.join(", ")}.`,
};

/**
 * Base Field Validators - Reusable schema builders
 */

// String Field
export const stringField = (options?: {
  min?: number;
  max?: number;
  length?: number;
  fieldName?: string;
}) => {
  const fieldName = options?.fieldName || "Input";
  let schema = z.string().min(1, VALIDATION_MESSAGES.required(fieldName));

  if (options?.min !== undefined) {
    schema = schema.min(
      options.min,
      VALIDATION_MESSAGES.min(fieldName, options.min),
    );
  }

  if (options?.max !== undefined) {
    schema = schema.max(
      options.max,
      VALIDATION_MESSAGES.max(fieldName, options.max),
    );
  }

  if (options?.length !== undefined) {
    schema = schema.length(
      options.length,
      VALIDATION_MESSAGES.length(fieldName, options.length),
    );
  }

  return schema;
};

export const optionalField = <T extends z.ZodType>(schema: T) =>
  z.union([z.literal(""), schema]).optional();

// Email Field
export const emailField = (options?: { fieldName?: string }) => {
  const fieldName = options?.fieldName || "Email";
  return z
    .string()
    .min(1, VALIDATION_MESSAGES.required(fieldName))
    .email(VALIDATION_MESSAGES.email(fieldName))
    .max(191, VALIDATION_MESSAGES.max(fieldName, 191))
    .toLowerCase();
};

// Password Field
export const passwordField = (options?: {
  min?: number;
  fieldName?: string;
  requireStrong?: boolean;
}) => {
  const fieldName = options?.fieldName || "Kata Sandi";
  const minLength = options?.min || 8;

  let schema = z
    .string()
    .min(1, VALIDATION_MESSAGES.required(fieldName))
    .min(minLength, VALIDATION_MESSAGES.min(fieldName, minLength));

  if (options?.requireStrong) {
    schema = schema
      .regex(/[a-z]/, "Kata sandi harus berisi minimal satu huruf kecil")
      .regex(/[A-Z]/, "Kata sandi harus berisi minimal satu huruf besar")
      .regex(/\d/, "Kata sandi harus berisi minimal satu angka")
      .regex(
        /[@$!%*?&]/,
        "Kata sandi harus berisi minimal satu karakter spesial (@$!%*?&)",
      );
  }

  return schema;
};

export const optionalPasswordField = (options?: {
  min?: number;
  fieldName?: string;
  requireStrong?: boolean;
}) => z.union([passwordField(options), z.literal("")]).optional();

// Number Field
export const numberField = (options?: {
  fieldName?: string;
  min?: number;
  max?: number;
  positive?: boolean;
  integer?: boolean;
}) => {
  const fieldName = options?.fieldName || "Angka";
  let schema = z.number();

  if (options?.positive) {
    schema = schema.positive(VALIDATION_MESSAGES.positive(fieldName));
  }

  if (options?.integer) {
    schema = schema.int(VALIDATION_MESSAGES.integer(fieldName));
  }

  if (options?.min !== undefined) {
    schema = schema.min(
      options.min,
      VALIDATION_MESSAGES.minNumber(fieldName, options.min),
    );
  }

  if (options?.max !== undefined) {
    schema = schema.max(
      options.max,
      VALIDATION_MESSAGES.maxNumber(fieldName, options.max),
    );
  }

  return schema;
};

// Email Field (Optional/Nullable)
export const emailFieldOptional = (options?: { fieldName?: string }) => {
  const fieldName = options?.fieldName || "Email";
  return z
    .string()
    .email(VALIDATION_MESSAGES.email(fieldName))
    .toLowerCase()
    .optional()
    .nullable();
};

// Phone Field
export const phoneField = (options?: { fieldName?: string }) => {
  const fieldName = options?.fieldName || "Nomor Telepon";
  return z
    .string()
    .min(1, VALIDATION_MESSAGES.required(fieldName))
    .refine(
      (val) => /^(\+62|0)[0-9]{9,15}$/.test(val),
      VALIDATION_MESSAGES.phone(fieldName),
    );
};

// URL Field
export const urlField = (options?: { fieldName?: string }) => {
  const fieldName = options?.fieldName || "URL";
  return z
    .string()
    .min(1, VALIDATION_MESSAGES.required(fieldName))
    .url(
      VALIDATION_MESSAGES.url(
        fieldName.toLowerCase() === "url" ? "URL" : fieldName,
      ),
    );
};

// Date Field
export const dateField = (options?: {
  fieldName?: string;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const fieldName = options?.fieldName || "Tanggal";
  let schema = z.date();

  if (options?.minDate) {
    schema = schema.refine(
      (date) => date >= options.minDate!,
      VALIDATION_MESSAGES.dateMin(
        fieldName,
        options.minDate!.toLocaleDateString("en-US"),
      ),
    );
  }

  if (options?.maxDate) {
    schema = schema.refine(
      (date) => date <= options.maxDate!,
      VALIDATION_MESSAGES.dateMax(
        fieldName,
        options.maxDate!.toLocaleDateString("en-US"),
      ),
    );
  }

  return schema;
};

// Select/Enum Field
export const selectField = <T extends readonly [string, ...string[]]>(
  values: T,
  options?: { fieldName?: string },
) => {
  const fieldName = options?.fieldName || "Pilihan";
  const enumValues = values as readonly [string, ...string[]];
  return z
    .enum(enumValues)
    .refine(
      (val) => val !== undefined && val !== null,
      VALIDATION_MESSAGES.selectRequired(fieldName),
    );
};

// Array Field
export const arrayField = <T extends z.ZodType>(
  schema: T,
  options?: { fieldName?: string; min?: number; max?: number; length?: number },
) => {
  const fieldName = options?.fieldName || "Item";
  let arraySchema = z
    .array(schema)
    .min(1, VALIDATION_MESSAGES.required(fieldName));

  if (options?.min !== undefined) {
    arraySchema = arraySchema.min(
      options.min,
      VALIDATION_MESSAGES.arrayMin(fieldName, options.min),
    );
  }

  if (options?.max !== undefined) {
    arraySchema = arraySchema.max(
      options.max,
      VALIDATION_MESSAGES.arrayMax(fieldName, options.max),
    );
  }

  if (options?.length !== undefined) {
    arraySchema = arraySchema.length(
      options.length,
      VALIDATION_MESSAGES.arrayLength(fieldName, options.length),
    );
  }

  return arraySchema;
};

export default z;
