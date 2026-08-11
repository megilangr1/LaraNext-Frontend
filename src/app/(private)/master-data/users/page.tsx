import { Users2, Plus } from "lucide-react";
import PageHeader from "../../_components/main/page-header";
import ListUser from "./_components/list-user";

export default function Page() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Manajemen Pengguna"
        description="Kelola pengguna, peran, dan informasi akun."
        icon={Users2}
        breadcrumbs={[
          { label: "Master Data", url: "/master-data" },
          { label: "Manajemen Pengguna" },
        ]}
        actionButtons={[
          {
            url: "/master-data/users/create",
            icon: Plus,
            title: "Buat",
            tooltip: "Buat pengguna baru",
            variant: "default",
          },
        ]}
      />

      <ListUser />
    </div>
  );
}
