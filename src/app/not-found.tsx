import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[60vh]">
      <h2 className="text-2xl text-center font-semibold">Halaman Tidak Ditemukan</h2>
      <p className="text-sm text-muted-foreground">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Button asChild>
        <Link href="/dashboard">Kembali ke Dashboard</Link>
      </Button>
    </div>
  );
}
