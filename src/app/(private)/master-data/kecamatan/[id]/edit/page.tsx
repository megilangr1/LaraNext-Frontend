import PageHeader from "@/app/(private)/_components/main/page-header";
import { ArrowLeft, Cog } from "lucide-react";
import FormKecamatan from "../../_components/form-kecamatan";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Ubah Kecamatan"
        description="Ubah data kecamatan di sistem."
        icon={Cog}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Data Kecamatan", url: "/master-data/kecamatan" },
          { label: "Ubah" },
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

      <FormKecamatan id={id} />
    </div>
  );
}
