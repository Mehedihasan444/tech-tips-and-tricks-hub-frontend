"use client";

import { useUser } from "@/context/user.provider";
// import type { Metadata } from "next";
import NavigationBar from "./components/shared/NavigationBar";
import { usePathname, useRouter } from "next/navigation";
import Footer from "./components/shared/Footer";
import { useEffect } from "react";
import { logout } from "@/services/AuthService";

// export const metadata: Metadata = {
//   title: "Tech Tips And Tricks Hub",
//   description: "",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      logout();
      router.push("/login");
    }
  }, [user, router]);
  return (
    <div>
      {pathname !== "/login" && pathname != "/register" && user && (
        <NavigationBar></NavigationBar>
      )}
      {children}
      {pathname !== "/login" && pathname != "/register" && user && (
        <Footer></Footer>
      )}
    </div>
  );
}
