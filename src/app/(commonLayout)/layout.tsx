"use client";


// export const metadata: Metadata = {
//   title: "Tech Tips And Tricks Hub",
//   description: "",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div>

      {children}

    </div>
  );
}
