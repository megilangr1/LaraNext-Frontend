import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

type BaseTableHeaderProps = {
  accessorKey: string;
  label: string;
  sortable?: boolean;
  sorted?: [boolean, string];
  onClickSort?: (accessorKey: string, value: "asc" | "desc") => void;
  hideable?: boolean;
  onClickVisible?: (accessorKey: string) => void;
};

const BaseTableHeader = ({
  accessorKey,
  label,
  sortable,
  sorted,
  onClickSort,
  hideable,
  onClickVisible,
}: BaseTableHeaderProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full items-center justify-between rounded-xs data-[state=open]:bg-accent h-8"
        >
          <span>{label}</span>

          {sorted && sorted[0] && sorted[1] === "desc" ? (
            <ArrowDown />
          ) : sorted && sorted[0] && sorted[1] === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortable && onClickSort && (
          <>
            <DropdownMenuItem onClick={() => onClickSort?.(accessorKey, "asc")}>
              <ArrowUp />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onClickSort?.(accessorKey, "desc")}
            >
              <ArrowDown />
              Desc
            </DropdownMenuItem>
          </>
        )}
        {hideable && onClickVisible && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onClickVisible?.(accessorKey)}>
              <EyeOff />
              Hide
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BaseTableHeader;
