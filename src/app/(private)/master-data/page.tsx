import { Users2, MoreHorizontal, Cog, Navigation } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import PageHeader from "../_components/main/page-header";

const masterDataList = [
  {
    title: "Data Pengguna",
    description: "Kelola pengguna, peran, dan informasi akun.",
    icon: Users2,
    href: "/master-data/users",
    createHref: "/master-data/users/create",
  },
  {
    title: "Data Kecamatan",
    description: "Manajemen data kecamatan pada aplikasi.",
    icon: Cog,
    href: "/master-data/kecamatan",
    createHref: "/master-data/kecamatan/create",
  },
  {
    title: "Data Kelurahan",
    description: "Manajemen data kelurahan pada aplikasi.",
    icon: Cog,
    href: "/master-data/kelurahan",
    createHref: "/master-data/kelurahan/create",
  },
];

export default function Page() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Master Data"
        description="Navigasi Master Data pada aplikasi."
        icon={Navigation}
        breadcrumbs={[{ label: "Master Data" }]}
        actionButtons={[]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {masterDataList.map((item) => (
          <Card
            key={item.title}
            className="hover:border-primary transition-colors group"
          >
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {item.description}
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={item.href}>Daftar Data</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={item.createHref}>Formulir</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href={item.href}>Buka Pengaturan {item.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
