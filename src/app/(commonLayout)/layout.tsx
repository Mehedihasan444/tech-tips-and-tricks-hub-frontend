"use client";
import { useUser } from "@/context/user.provider";
import NavigationBar from "./components/shared/NavigationBar";
import { usePathname } from "next/navigation";
// import { useEffect } from "react";
// import { logout } from "@/services/AuthService";
// import type { Metadata } from "next";
// import Footer from "./components/shared/Footer";

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
  // const router = useRouter();
  // useEffect(() => {
  //   if (
  //     !user &&
  //     pathname !== "/register" &&
  //     pathname !== "/reset-password" &&
  //     pathname !== "/forget-password"
  //   ) {
  //     logout();
  //     router.push("/login");
  //   }
  // }, [user, router, pathname]);
  return (
    <div>
      {/* {pathname !== "/login" && pathname != "/register" && user && (
        <NavigationBar></NavigationBar>
      )} */}
      {children}
      {/* {pathname !== "/login" && pathname != "/register" && user && (
        // <Footer></Footer>
      )} */}
    </div>
  );
}
