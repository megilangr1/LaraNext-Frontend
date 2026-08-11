import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthClientGuard from "@/modules/auth/components/auth-client-guard";
import AuthInit from "@/modules/auth/components/auth-init";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import SiteHeader from "./_components/main/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInit redirect={true} />

      <AuthClientGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col gap-2 px-4 py-3">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </AuthClientGuard>
    </>
  );
}
