import PageHeader from "@/app/(private)/_components/main/page-header";
import { ArrowLeft, Cog } from "lucide-react";
import FormKecamatan from "../_components/form-kecamatan";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Buat Kecamatan"
        description="Tambahkan data kecamatan baru ke sistem."
        icon={Cog}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Data Kecamatan", url: "/master-data/kecamatan" },
          { label: "Buat" },
        ]}
        actionButtons={[
          {
            url: "/master-data/kecamatan",
            icon: ArrowLeft,
            title: "Kembali",
            tooltip: "Kembali ke Data Kecamatan",
            variant: "default",
          },
        ]}
      />

      <FormKecamatan />
    </div>
  );
}
