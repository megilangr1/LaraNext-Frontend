import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationMeta } from "@/shared/types/api-response";
import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { generatePagination } from "./pagination-helper";

interface PaginationTableProps {
  meta: PaginationMeta;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  sortedBy: { label: string; direction: "asc" | "desc" };
}

export function PaginationTable({
  meta,
  setPage,
  setLimit,
}: PaginationTableProps) {
  const { current_page, last_page, per_page, total } = meta;

  const pages = useMemo(
    () => generatePagination(meta?.current_page ?? 1, meta?.last_page ?? 1),
    [meta],
  );

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between px-2 gap-2 overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex flex-col lg:min-w-25 items-center justify-center text-xs font-medium"
        >
          {total.toLocaleString("id-ID")} Data Total
        </Button>

        <Select
          value={per_page.toString()}
          onValueChange={(value) => {
            setLimit(parseInt(value));
          }}
        >
          <SelectTrigger size="sm" className="h-8 w-17.5">
            <SelectValue placeholder={per_page} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Pagination className="flex-auto flex items-center justify-center lg:justify-end space-x-1">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(current_page - 1, 1))}
              className={cn(
                current_page === 1 && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>

          {pages.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={item === current_page}
                  onClick={() => setPage(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPage(Math.min(current_page + 1, last_page ?? 1))
              }
              className={cn(
                current_page === last_page && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
