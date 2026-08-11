import QueryString from "qs";
import { TableColumns } from "./dynamic-table";

export type SortCondition = {
  key: string;
  direction: "asc" | "desc";
};

export type FilterState = {
  search?: string;
  sortBy: string;
  sortType: "asc" | "desc";
  page?: number;
  limit: number;
};

export const defaultFilterState: FilterState = {
  search: "",
  sortBy: "created_at",
  sortType: "desc",
  page: 1,
  limit: 10,
};

export function toQueryString(state: FilterState) {
  return QueryString.stringify(state, {
    encodeValuesOnly: true, // biar key gak ikut di-encode
    arrayFormat: "indices", // hasil: filters[0][key]=...
  });
}

export function getSortLabel<T>(
  columns: TableColumns<T>[],
  sortBy: string,
  sortType: "asc" | "desc",
) {
  const col = columns.find((c) => c.accessorKey === sortBy);
  return { label: col?.label ?? sortBy, direction: sortType };
}

export function createUpdateFilter<T extends object>(
  setFilter: React.Dispatch<React.SetStateAction<T>>,
) {
  return function updateFilter<K extends keyof T>(key: K, value: T[K]) {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };
}
