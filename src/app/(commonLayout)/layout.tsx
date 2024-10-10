import type { Metadata } from "next";
import NavigationBar from "./components/shared/NavigationBar";

export const metadata: Metadata = {
  title: "Tech Tips And Tricks Hub",
  description: "",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavigationBar></NavigationBar>
      {children}
      {/* <Footer></Footer> */}
    </div>
  );
}
