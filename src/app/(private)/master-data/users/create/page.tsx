import PageHeader from "@/app/(private)/_components/main/page-header";
import { Users2, ArrowLeft } from "lucide-react";
import FormUser from "../_components/form-user";

export default function Page() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Buat Pengguna"
        description="Tambahkan pengguna baru ke sistem."
        icon={Users2}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Manajemen Pengguna", url: "/master-data/users" },
          { label: "Buat" },
        ]}
        actionButtons={[
          {
            url: "/master-data/users",
            icon: ArrowLeft,
            title: "Kembali",
            tooltip: "Kembali ke Daftar Pengguna",
            variant: "default",
          },
        ]}
      />

      <FormUser />
    </div>
  );
}
