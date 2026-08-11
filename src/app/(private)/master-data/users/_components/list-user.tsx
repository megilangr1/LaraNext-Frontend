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
import { User } from "@/modules/private/user/schema/user.schema";
import DeleteDialog from "@/shared/components/dialog/delete-dialog";
import DynamicTable, {
  TableColumns,
} from "@/shared/components/table/dynamic-table";
import { useDeleteDialogStore } from "@/shared/stores/delete-dialog-store";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

const ListUser = () => {
  const doDelete = useCallback((data: User, description?: string) => {
    requestAnimationFrame(() => {
      useDeleteDialogStore
        .getState()
        .openDialogDelete(
          `/api/master-data/users/${data.uuid}`,
          `/api/master-data/users`,
          undefined,
          description,
        );
    });
  }, []);

  const columns: TableColumns<User>[] = [
    {
      accessorKey: "name",
      label: "Nama",
    },
    {
      accessorKey: "email",
      label: "Email",
    },
    {
      accessorKey: "roles",
      label: "Grup Akses",
      sortable: false,
      cnRender: "p-0",
      render: (row) => (
        <div className="flex items-center justify-start gap-2">
          {row.roles.map((role) => (
            <Badge key={role} className="text-[10px] tracking-wider rounded-xs">
              {role}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      label: "Dibuat Pada",
      render: (row) => (
        <Badge className="text-[10px] tracking-wider rounded-xs">
          {formatDate(row.created_at, true)}
        </Badge>
      ),
      cnRender: "text-center text-xs",
    },
    {
      label: "Aksi",
      hClass: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-auto p-0">
                <span className="sr-only">Opsi Aksi</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/master-data/users/${row.uuid}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  Edit Data
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => doDelete(row)}
              >
                Hapus Data
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
        apiUrl="/api/master-data/users"
        columns={columns}
        withNumbering={true}
      />

      <DeleteDialog />
    </div>
  );
};

export default ListUser;
