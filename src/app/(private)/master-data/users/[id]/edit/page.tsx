import PageHeader from "@/app/(private)/_components/main/page-header";
import { ArrowLeft, Users2 } from "lucide-react";
import FormUser from "../../_components/form-user";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Edit Pengguna"
        description="Edit informasi pengguna."
        icon={Users2}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Manajemen Pengguna", url: "/master-data/users" },
          { label: "Edit" },
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

      <FormUser id={id} />
    </div>
  );
}
