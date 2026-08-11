"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[60vh]">
      <h2 className="text-2xl text-center font-semibold">
        Terjadi Kesalahan, Silahkan Hubungi Administrator!
      </h2>
      <p className="text-sm text-muted-foreground">
        {error.message || "Terjadi kesalahan yang tidak diketahui"}
      </p>
      <Button onClick={() => reset()}>
        <RotateCcw />
        Muat Ulang Halaman
      </Button>
    </div>
  );
}
