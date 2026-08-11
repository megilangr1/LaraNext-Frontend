"use client";

import { WelcomeHeader } from "./components/welcome-header";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/modules/auth/store/auth-store";

export default function DashboardPage() {
  const user = useAuth((s) => s.user);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="flex flex-col gap-2 px-2 py-3">
        <WelcomeHeader userName={user?.name ?? "Admin"} />

        <Separator className="mb-4 bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
