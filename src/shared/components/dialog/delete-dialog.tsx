"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchClient } from "@/shared/helpers/client-fetcher";
import { useDeleteDialogStore } from "@/shared/stores/delete-dialog-store";
import { useState } from "react";
import { mutate } from "swr";
import { doAlert } from "../do-alert";

interface DeleteDialogProps {
  apiUrl?: string;
}

const DeleteDialog = ({ apiUrl }: DeleteDialogProps) => {
  const { openDelete, deleteUrl, refreshUrl, closeDialogDelete, description } =
    useDeleteDialogStore();
  const [isLoading, setIsLoading] = useState(false);

  async function doDelete() {
    if (!deleteUrl) return;

    try {
      setIsLoading(true);

      const { success, message } = await fetchClient(deleteUrl, {
        method: "DELETE",
      });

      if (!success) {
        doAlert(0, "Terjadi Kesalahan! | " + message);
        setIsLoading(false);
        return;
      }

      if (apiUrl) mutate(apiUrl);
      if (refreshUrl)
        mutate((key) => typeof key === "string" && key.startsWith(refreshUrl));

      closeDialogDelete();
      doAlert(3, message);
    } catch {
      doAlert(0, "Terjadi Kesalahan, Silahkan Hubungi Administrator !");
    } finally {
      setIsLoading(false);
    }
  }

  if (!openDelete) return null;

  return (
    <Dialog
      open={openDelete}
      onOpenChange={(value) => {
        if (!value) closeDialogDelete();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this data?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The data will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        {description && (
          <div className="bg-slate-100 border border-slate-400 rounded-lg px-4 py-2">
            {description}
          </div>
        )}

        <hr className="border-t-4 w-full" />

        <DialogFooter>
          <Button
            size="lg"
            variant={"secondary"}
            onClick={closeDialogDelete}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button size="lg" onClick={doDelete} disabled={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
