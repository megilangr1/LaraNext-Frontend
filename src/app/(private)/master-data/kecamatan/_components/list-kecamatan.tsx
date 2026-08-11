"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils/date";
import { Kecamatan } from "@/modules/private/kecamatan/schema/kecamatan.schema";
import DeleteDialog from "@/shared/components/dialog/delete-dialog";
import DynamicTable, {
  TableColumns,
} from "@/shared/components/table/dynamic-table";
import { useDeleteDialogStore } from "@/shared/stores/delete-dialog-store";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

const ListKecamatan = () => {
  const doDelete = useCallback((data: Kecamatan, description?: string) => {
    requestAnimationFrame(() => {
      useDeleteDialogStore
        .getState()
        .openDialogDelete(
          `/api/master-data/kecamatan/${data.uuid}`,
          `/api/master-data/kecamatan`,
          undefined,
          description,
        );
    });
  }, []);

  const columns: TableColumns<Kecamatan>[] = [
    {
      accessorKey: "kode_kecamatan",
      label: "Kode Kecamatan",
    },
    {
      accessorKey: "nama_kecamatan",
      label: "Nama Kecamatan",
    },
    {
      accessorKey: "keterangan",
      label: "Keterangan",
    },
    {
      accessorKey: "created_at",
      label: "Created At",
      render: (row) => (
        <Badge className="text-[10px] tracking-wider rounded-xs">
          {formatDate(row.created_at, true)}
        </Badge>
      ),
      cnRender: "text-center text-xs",
    },
    {
      label: "Action",
      hClass: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-auto p-0">
                <span className="sr-only">Action Option</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Action Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/master-data/kecamatan/${row.uuid}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  Edit Data
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => doDelete(row)}
              >
                Delete Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <DynamicTable
        apiUrl="/api/master-data/kecamatan"
        columns={columns}
        withNumbering={true}
      />

      <DeleteDialog />
    </div>
  );
};

export default ListKecamatan;
