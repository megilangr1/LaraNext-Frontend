"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, RotateCcw } from "lucide-react";
import { useState } from "react";
import useAuth from "../store/auth-store";

const LogoutButton = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  return (
    <Button
      className={cn(
        "w-full items-center justify-start gap-x-4 rounded-sm hover:bg-primary/90",
        className,
      )}
      size={"sm"}
      onClick={async () => {
        setIsLoading(true);
        await logout();
        window.location.href = "/login";
        setIsLoading(false);
      }}
    >
      {isLoading ? (
        <RotateCcw className="shrink-0 size-4 animate-spin" />
      ) : (
        <LogOut className="shrink-0 size-4" />
      )}
      Logout
    </Button>
  );
};

export default LogoutButton;
