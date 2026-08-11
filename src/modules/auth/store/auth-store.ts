import { User } from "@/modules/private/user/schema/user.schema";
import { MainRes } from "@/shared/types/api-response";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  authReady: boolean;
};

type AuthAction = {
  setSession: (user: User | null) => void;
  clearSession: () => void;
  fetchMe: () => Promise<boolean>;
  logout: () => Promise<void>;
};

const useAuth = create<AuthState & AuthAction>((set) => ({
  user: null,
  authReady: false,

  setSession: (user: User | null) =>
    set({
      user,
      authReady: true,
    }),

  clearSession: () =>
    set({
      user: null,
      authReady: false,
    }),

  fetchMe: async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data: MainRes<User> = await res.json();

      if (data.success && data.result) {
        set({
          user: data.result,
          authReady: true,
        });

        return true;
      } else {
        set({
          user: null,
          authReady: true,
        });

        return false;
      }
    } catch {
      set({
        user: null,
        authReady: true,
      });

      return false;
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      set({ user: null, authReady: true });
    }
  },
}));

export default useAuth;
