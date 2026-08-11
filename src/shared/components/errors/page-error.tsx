"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { mutate } from "swr";

export default function PageError({
  error,
  reset,
  mutateUrl,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  mutateUrl?: string | string[];
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const tryAgain = () => {
    if (mutateUrl) {
      if (Array.isArray(mutateUrl)) {
        mutateUrl.forEach((url) => mutate(url));
      } else {
        mutate((key) => typeof key === "string" && key.startsWith(mutateUrl));
      }
    }

    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[40vh]">
      <h2 className="text-xl text-center">
        Terjadi Kesalahan, Silahkan Hubungi Administrator !
      </h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => tryAgain()
        }
      >
        <RotateCcw />
        Muat Ulang Halaman
      </Button>
    </div>
  );
}
