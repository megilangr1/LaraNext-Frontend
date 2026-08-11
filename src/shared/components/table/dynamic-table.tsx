import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  createUpdateFilter,
  defaultFilterState,
  FilterState,
  getSortLabel,
  toQueryString,
} from "./filter-state";
import { Input } from "@/components/ui/input";
import { RefreshCcw, SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import PageError from "../errors/page-error";
import BaseTableHeader from "./base-table";
import LoadingRow from "./loading-row";
import { PaginationTable } from "./pagination-table";
import { fetcher } from "@/shared/helpers/client-fetcher";
import { headBodyConfig, NumberingProps, renderCell } from "./column-config";
import { PaginationResponse } from "@/shared/types/api-response";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WithId = {
  uuid: string | number;
};

export type TableColumns<T> = {
  accessorKey?: keyof T;
  label: string;
  hClass?: string;
  render?: (row: T) => React.ReactNode;
  cnRender?: string;
  sortable?: boolean;
  hideable?: boolean;
};

type DynamicTableProps<T> = {
  apiUrl: string;
  columns: TableColumns<T>[];
  withNumbering?: boolean;
};

const DynamicTable = <T extends WithId>({
  apiUrl,
  columns,
  withNumbering = false,
}: DynamicTableProps<T>) => {
  const [filter, setFilter] = useState<FilterState>({
    ...defaultFilterState,
  });

  const numbering: NumberingProps = {
    active: withNumbering,
  };

  const updateFilter = createUpdateFilter<typeof filter>(setFilter);

  function setPage(page: number) {
    setFilter((prev) => ({ ...prev, page }));
  }

  function setLimit(limit: number) {
    updateFilter("limit", limit);
  }

  // Sort Label
  const sortedLabel = getSortLabel(columns, filter.sortBy, filter.sortType);

  // Search Function
  const debounced = useDebouncedCallback(
    // function
    (value) => updateFilter("search", value),
    // delay in ms
    1000,
  );

  const [tableHeader, tableBody] = headBodyConfig({ columns, numbering });

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PaginationResponse<T>
  >(`${apiUrl}?${toQueryString(filter)}`, fetcher);

  if (error) return <PageError error={error} reset={() => mutate()} />;

  return (
    <div className="flex flex-col gap-2">
      <hr className="w-full border-t-2 sm:hidden" />

      <div className="w-full grid grid-cols-12 gap-2">
        <div className="col-span-12 sm:col-span-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="w-full gap-2 px-3"
                onClick={() => mutate()}
                disabled={isValidating}
              >
                <RefreshCcw
                  className={cn(
                    "shrink-0 h-4 w-4",
                    isValidating && "animate-spin",
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="me-2">
              <p className="max-w-52 lg:max-w-full flex-wrap text-wrap whitespace-pre-wrap p-0">
                Refresh Data
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <div className="relative w-full">
            <Input
              id="search-data"
              name="search-data"
              type="text"
              placeholder="Cari Data..."
              className="ps-9"
              onChange={(e) => debounced(e.target.value)}
            />

            <div className="absolute inset-y-1.5 inset-s-0 pointer-events-none ps-3 text-sm">
              <SearchIcon className="shrink-0 size-4 opacity-60" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map((col) => (
                <TableHead key={col.id}>
                  <div className={cn("w-full py-1", col.className)}>
                    {col.dropdown && col.accessorKey ? (
                      <BaseTableHeader
                        accessorKey={col.accessorKey}
                        label={col.label}
                        sorted={[
                          filter.sortBy === col.accessorKey,
                          filter.sortType,
                        ]}
                        sortable={col.sortable}
                        onClickSort={(accessorKey, type) => {
                          updateFilter("sortBy", accessorKey);
                          updateFilter("sortType", type);
                        }}
                        hideable={col.hideable}
                        onClickVisible={() => {}}
                      />
                    ) : (
                      col.label
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.data.length < 1 && (
              <TableRow>
                <TableCell colSpan={tableHeader.length}>
                  <div className="flex flex-col gap-1 items-center justify-center tracking-wide">
                    Belum Ada Data.
                    {filter.search && (
                      <span className="text-xs">(Dengan Filter Tersebut)</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {data &&
              data.data.length > 0 &&
              data.data.map((v, i) => (
                <TableRow key={v.uuid ?? i}>
                  {tableBody.map((col) => (
                    <TableCell key={col.id}>
                      <div className={cn("w-full px-3", col.className)}>
                        {renderCell(
                          col,
                          v,
                          data.meta.current_page,
                          data.meta.per_page,
                          i,
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {isLoading && <LoadingRow colsPan={tableHeader.length} />}
          </TableBody>
        </Table>
      </div>

      {data && (
        <PaginationTable
          meta={data.meta}
          setLimit={setLimit}
          setPage={setPage}
          sortedBy={sortedLabel}
        />
      )}
    </div>
  );
};

export default DynamicTable;
