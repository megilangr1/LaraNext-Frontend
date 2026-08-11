import PageHeader from "@/app/(private)/_components/main/page-header";
import { ArrowLeft, Cog } from "lucide-react";
import FormKelurahan from "../_components/form-kelurahan";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Buat Kelurahan"
        description="Tambahkan data kelurahan baru ke sistem."
        icon={Cog}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Data Kelurahan", url: "/master-data/kelurahan" },
          { label: "Buat" },
        ]}
        actionButtons={[
          {
            url: "/master-data/kelurahan",
            icon: ArrowLeft,
            title: "Kembali",
            tooltip: "Kembali ke Data Kelurahan",
            variant: "default",
          },
        ]}
      />

      <FormKelurahan />
    </div>
  );
}
