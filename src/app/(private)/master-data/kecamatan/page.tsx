import { Cog, Plus } from "lucide-react";
import PageHeader from "../../_components/main/page-header";
import ListKecamatan from "./_components/list-kecamatan";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Data Kecamatan"
        description="Manajemen data kecamatan pada aplikasi."
        icon={Cog}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Data Kecamatan" },
        ]}
        actionButtons={[
          {
            url: "/master-data/kecamatan/create",
            icon: Plus,
            title: "Buat",
            tooltip: "Buat data kecamatan baru",
            variant: "default",
          },
        ]}
      />

      <ListKecamatan />
    </div>
  );
}
