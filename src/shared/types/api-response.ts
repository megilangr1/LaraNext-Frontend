export type ValidationError = Record<string, string[]>;

export type SuccessResponse<T> = {
  success: true;
  code: string;
  message: string;
  result: T;
};

export type ErrorResponse = {
  success: false;
  code: string;
  message: string;
  errors: ValidationError | string | null;
};

export type MainRes<T> = SuccessResponse<T> | ErrorResponse;

// Pagination Response
export interface PaginationResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export type PaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};
