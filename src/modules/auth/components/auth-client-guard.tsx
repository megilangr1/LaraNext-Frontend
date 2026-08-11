"use client";

import LoadingScreen from "@/shared/components/loading-screen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../store/auth-store";

const AuthClientGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authReady, user } = useAuth();

  useEffect(() => {
    if (authReady && !user) {
      router.replace("/login");
    }
  }, [authReady, user, router]);

  if (!authReady || !user) {
    return <LoadingScreen topIndex={true} />;
  }

  return <>{children}</>;
};

export default AuthClientGuard;
