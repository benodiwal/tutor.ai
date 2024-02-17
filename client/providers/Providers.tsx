"use client";

import { AuthProvider } from "@/context/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
}