"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/utils/sessionManager";

export default function ProtectedRoute({ children, requireAuth = true }) {
  const router = useRouter();

  useEffect(() => {
    const token = getUserSession();
    const isLoginPage = window.location.pathname === "/login";

    if (requireAuth && !token) {
      // Redirect to login if no token
      router.push("/login");
    } else if (!requireAuth && token) {
      // Redirect authenticated users away from login page
      router.push("/");
    }
  }, [router, requireAuth]);

  return <>{children}</>;
}
