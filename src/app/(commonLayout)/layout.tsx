"use client";

import { useUser } from "@/context/user.provider";
// import type { Metadata } from "next";
import NavigationBar from "./components/shared/NavigationBar";
import { usePathname } from "next/navigation";

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
  return (
    <div>
      {pathname !== "/login" && pathname != "/register" && user && (
        <NavigationBar></NavigationBar>
      )}
      {children}
      {/* <Footer></Footer> */}
    </div>
  );
}
