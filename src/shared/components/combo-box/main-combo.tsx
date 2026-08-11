"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MainComboProps<T> {
  children: React.ReactNode;

  title?: string;
  description?: string;

  data: T[];
  setSelectedData?: React.Dispatch<React.SetStateAction<T | null>>;
  setSelectedVoid?: (value: T | null) => void;
  onSelected?: (item: T) => void;

  extractor: {
    exKey: (item: T) => string;
    exVal: (item: T) => string;
    exText: (item: T) => string;
  };

  popClassName?: string;
}

export function MainCombo<T>({
  children,

  title,
  description,

  data,
  setSelectedData,
  setSelectedVoid,
  onSelected,
  extractor,

  popClassName,
}: MainComboProps<T>) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
          }}
        >
          {children}
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-full sm:w-auto lg:w-sm p-0 h-52 max-w-[70vw]",
            popClassName,
          )}
          align="start"
        >
          <StatusList<T>
            setOpen={setOpen}
            data={data}
            setSelectedData={setSelectedData}
            setSelectedVoid={setSelectedVoid}
            onSelected={onSelected}
            extractor={extractor}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        onKeyDown={(event) => {
          event.preventDefault();
          if (event.key === "Enter" || event.key === " ") {
            setOpen(true);
          }
        }}
      >
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pb-0">
          <DrawerTitle>{title ?? "Daftar Data"}</DrawerTitle>
          <DrawerDescription>
            {description ?? "Silahkan Pilih Salah Satu Data"}
          </DrawerDescription>
        </DrawerHeader>

        <div className="mt-4 border-t">
          <StatusList<T>
            setOpen={setOpen}
            data={data}
            onSelected={onSelected}
            setSelectedData={setSelectedData}
            setSelectedVoid={setSelectedVoid}
            extractor={extractor}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList<T>({
  setOpen,
  data,
  setSelectedData,
  setSelectedVoid,
  onSelected,
  extractor,
}: {
  setOpen: (open: boolean) => void;
  data: T[];
  setSelectedData?: React.Dispatch<React.SetStateAction<T | null>>;
  setSelectedVoid?: (value: T | null) => void;
  onSelected?: (item: T) => void;

  extractor: {
    exKey: (item: T) => string;
    exVal: (item: T) => string;
    exText: (item: T) => string;
  };
}) {
  return (
    <Command>
      <CommandInput placeholder="Cari Data..." />
      <CommandList className="max-h-[60vh] min-h-40">
        <CommandEmpty>Data Tidak di-Temukan.</CommandEmpty>
        <CommandGroup>
          {data.map((item) => (
            <CommandItem
              key={extractor.exKey(item)}
              value={extractor.exVal(item)}
              onSelect={(value) => {
                if (setSelectedData)
                  setSelectedData(
                    data.find((item) => extractor.exVal(item) === value) ||
                      null,
                  );

                if (onSelected) onSelected(item);

                if (setSelectedVoid)
                  setSelectedVoid(
                    data.find((item) => extractor.exVal(item) === value) ||
                      null,
                  );

                setOpen(false);
              }}
            >
              {extractor.exText(item)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
