export function removeCountryCode(phone: string | undefined): string {
  return phone?.startsWith("+62")
    ? phone.replace("+62", "")
    : (phone?.toString() as string);
}

export function formatFieldLabel(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type SlugOptions = {
  separator?: "-" | "_";
  normalize?: boolean;
  replaceSlash?: boolean;
};

export function createSlug(input: string, options: SlugOptions = {}): string {
  const { separator = "-", normalize = true, replaceSlash = true } = options;

  let str = input.toLowerCase().trim();

  if (normalize) {
    str = str.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); // hilangkan diakritik
  }

  if (replaceSlash) {
    str = str.replace(/\s*\/\s*/g, `${separator}atau${separator}`);
  }

  str = str
    .replace(/[^a-z0-9]+/g, separator) // ganti non-alphanum jadi separator
    .replace(new RegExp(`${separator}{2,}`, "g"), separator) // hilangkan separator beruntun
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), ""); // trim

  return str;
}

export function streamServerFileUrl(url: string, disk: string) {
  return disk === "private-path"
    ? `/private-file/${url}`
    : `/public-file/${url}`;
}
