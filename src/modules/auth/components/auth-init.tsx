"use client";

import { useEffect } from "react";
import useAuth from "../store/auth-store";

const AuthInit = ({ redirect = false }: { redirect?: boolean }) => {
  const { fetchMe, authReady } = useAuth();

  useEffect(() => {
    if (authReady) return;

    const init = async () => {
      const auth = await fetchMe();

      if (!auth && redirect) {
        window.location.href = "/login";
      }
    };

    void init();
  }, [fetchMe, authReady, redirect]);

  return null;
};

export default AuthInit;
