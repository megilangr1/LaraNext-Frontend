import { create } from "zustand";

type DeleteDialogState = {
  deleteUrl?: string;
  openDelete: boolean;
  refreshUrl?: string;
  onAfterDelete?: () => void;
  description?: string;

  openDialogDelete: (
    url: string,
    refreshUrl?: string,
    onAfterDelete?: () => void,
    description?: string,
  ) => void;
  closeDialogDelete: () => void;
};

export const useDeleteDialogStore = create<DeleteDialogState>((set) => ({
  openDelete: false,
  deleteUrl: undefined,
  refreshUrl: undefined,
  description: undefined,
  openDialogDelete: (deleteUrl, refreshUrl, onAfterDelete, description) =>
    set({
      openDelete: true,
      deleteUrl,
      refreshUrl: refreshUrl,
      onAfterDelete: onAfterDelete,
      description: description,
    }),
  closeDialogDelete: () =>
    set({
      openDelete: false,
      deleteUrl: undefined,
      refreshUrl: undefined,
      onAfterDelete: undefined,
      description: undefined,
    }),
}));
