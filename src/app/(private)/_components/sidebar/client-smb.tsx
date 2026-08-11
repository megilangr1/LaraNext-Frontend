"use client";

import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface ClientSmbProps {
  detail: {
    title: string;
    className?: string;
  };
  children: React.ReactNode;
}

const ClientSmb = ({ detail, children }: ClientSmbProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuButton
      tooltip={detail.title}
      className={cn(detail.className)}
      onClick={() => {
        if (isMobile) setOpenMobile(false);
      }}
    >
      {children}
    </SidebarMenuButton>
  );
};

export default ClientSmb;
