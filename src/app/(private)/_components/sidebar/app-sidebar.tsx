import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AppWindowMac,
  Captions,
  Home,
  Info,
  LucideIcon,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// Brand info constants
const BRAND_INFO = {
  logoAlt: "Logo",
  creditText: "MeG",
} as const;

export interface NavList {
  title: string;
  url: string;
  icon: LucideIcon;
  className?: string;
  items?: NavChild[];
}

export interface NavChild {
  title: string;
  url: string;
  className?: string;
}

const navMain: NavList[] = [
  {
    title: "Public Page",
    url: "/",
    icon: AppWindowMac,
    className:
      "bg-primary text-white hover:bg-neutral-900/90 hover:text-white transition-all duration-500 ease-in-out",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Dummy",
    url: "/dummy",
    icon: Info,
  },
];

const navAdmin: NavList[] = [
  {
    title: "Master Data",
    url: "#",
    icon: Captions,
    items: [
      {
        title: "Pengguna",
        url: "/master-data/users",
      },
      {
        title: "Kecamatan",
        url: "/master-data/kecamatan",
      },
      {
        title: "Kelurahan",
        url: "/master-data/kelurahan",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-1.5">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-4"
              >
                <Avatar className="size-12 sm:size-14 rounded-lg border">
                  <AvatarImage src="/logo.png" alt={BRAND_INFO.logoAlt} />
                  <AvatarFallback>MeG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 flex-auto">
                  <span className="text-xs font-semibold tracking-wide">
                    {process.env.NEXT_PUBLIC_APP_NAME || "NextJS Project"}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                    <span className="text-slate-500">by</span>
                    <span className="text-slate-600 underline underline-offset-2 font-medium">
                      {BRAND_INFO.creditText}
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="border-t border-sidebar-border" />
      <SidebarContent className="gap-0">
        <NavMain items={navMain} title="Navigasi Utama" />
        <NavMain items={navAdmin} title="Navigasi Admin" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
