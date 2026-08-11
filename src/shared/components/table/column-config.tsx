import { createSlug } from "@/shared/helpers/client-helper";
import { TableColumns } from "./dynamic-table";

type HeaderTable = {
  id: string;
  accessorKey?: string;
  label: string;
  className?: string;
  sortable?: boolean;
  hideable?: boolean;
  dropdown: boolean;
};

type BodyTable<T> = {
  id: string;
  accessorKey?: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  numberingRender?: (
    currentPage: number,
    perPage: number,
    index: number,
  ) => React.ReactNode;
};

export type NumberingProps = {
  active: boolean;
};

type HeadBodyConfigProps<T> = {
  columns: TableColumns<T>[];
  numbering: NumberingProps;
};

export const headBodyConfig = <T,>({
  columns,
  numbering = {
    active: false,
  },
}: HeadBodyConfigProps<T>): [HeaderTable[], BodyTable<T>[]] => {
  let header: HeaderTable[] = columns.map((col, i) => {
    const sortable = col.sortable ?? true;
    const hideable = col.hideable ?? false;

    return {
      id:
        col.accessorKey !== undefined
          ? String(col.accessorKey) + `-${i}`
          : createSlug(`${col.label} ${i}`, { separator: "-" }),
      accessorKey: col.accessorKey?.toString(),
      label: col.label,
      className: col.hClass,
      sortable,
      hideable,
      dropdown: !!sortable || !!hideable,
    };
  });

  let body: BodyTable<T>[] = columns.map((col, i) => {
    if (!col.render && col.accessorKey) {
      col.render = (row) => safeRender(row[col.accessorKey as keyof T]);
    }

    return {
      id:
        col.accessorKey !== undefined
          ? String(col.accessorKey) + `-${i}`
          : createSlug(`${col.label} ${i}`, { separator: "-" }),
      accessorKey: col.accessorKey?.toString(),
      render: col.render,
      className: col.cnRender,
    };
  });

  if (numbering.active) {
    header = [
      {
        id: "no",
        label: "No.",
        className: "text-center font-semibold",
        dropdown: false,
      },
      ...header,
    ];

    body = [
      {
        id: "no",
        numberingRender: (
          currentPage: number,
          perPage: number,
          index: number,
        ) => {
          return (
            <div className="text-center font-semibold text-xs">
              {(currentPage - 1) * perPage + index + 1 + "."}
            </div>
          );
        },
      },
      ...body,
    ];
  }

  return [header, body];
};

export function safeRender(value: unknown): React.ReactNode {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return "-";
  return String(value);
}

export function renderCell<T>(
  col: BodyTable<T>,
  row: T,
  currentPage: number,
  perPage: number,
  index: number,
): React.ReactNode {
  if (col.id === "no" && col.numberingRender)
    return col.numberingRender(currentPage, perPage, index);

  return col.render?.(row) ?? null;
}
