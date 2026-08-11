import { Cog, Plus } from "lucide-react";
import PageHeader from "../../_components/main/page-header";
import ListKelurahan from "./_components/list-kelurahan";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Data Kelurahan"
        description="Manajemen data kelurahan pada aplikasi."
        icon={Cog}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Data Kelurahan" },
        ]}
        actionButtons={[
          {
            url: "/master-data/kelurahan/create",
            icon: Plus,
            title: "Buat",
            tooltip: "Buat data kelurahan baru",
            variant: "default",
          },
        ]}
      />

      <ListKelurahan />
    </div>
  );
}
