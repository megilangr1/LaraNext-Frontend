import PageHeader from "@/app/(private)/_components/main/page-header";
import { ArrowLeft, Cog } from "lucide-react";
import FormKelurahan from "../../_components/form-kelurahan";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Ubah Kelurahan"
        description="Ubah data kelurahan di sistem."
        icon={Cog}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Data Kelurahan", url: "/master-data/kelurahan" },
          { label: "Ubah" },
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

      <FormKelurahan id={id} />
    </div>
  );
}
