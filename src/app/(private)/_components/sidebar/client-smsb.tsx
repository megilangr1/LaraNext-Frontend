"use client";

import { SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

interface ClientSmsbProps {
  url: string;
  title: string;
}

const ClientSmsb = ({ url, title }: ClientSmsbProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuSubButton
      asChild
      onClick={() => {
        if (isMobile) setOpenMobile(false);
      }}
      className="h-auto min-h-7"
    >
      <Link href={url} className="w-full">
        {title}
      </Link>
    </SidebarMenuSubButton>
  );
};

export default ClientSmsb;
