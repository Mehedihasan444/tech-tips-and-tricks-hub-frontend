import {
  BarChart,
  Cog,
  DollarSign,
  FileText,
  Home,
  Users,
  Edit,
  BadgePlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "../../layout/layout-context";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Link href="/" className="text-2xl font-semibold">
            <span className="text-teal-600 transition duration-300">
              TECHNEST
            </span>
          </Link>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {/* Dashboard Home */}
            <SidebarItem
              title="Dashboard Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />

            {/* My Posts Section */}
            <SidebarMenu title="Posts">
              <SidebarItem
                isActive={pathname === "/dashboard/my-posts"}
                title="My Posts"
                icon={<FileText />}
                href="/dashboard/my-posts"
              />

              <CollapseItems
                icon={<Cog />}
                title="Post Management"
                isActive={pathname}
                // href="/dashboard/create-post"
                items={[
                  {
                    title: "Create Post",
                    icon: <BadgePlus/>,
                    href: "/dashboard/create-post",
                  },
                  {
                    title: "Manage Posts",
                    icon: <Edit />,
                    href: "/dashboard/manage-posts",
                  },
                  // {
                  //   title: "Delete Posts",
                  //   icon: <Trash2 />,
                  //   href: "/dashboard/delete-post",
                  // },
                ]}
              />
            </SidebarMenu>

            {/* Analytics Section */}
            <SidebarMenu title="Analytics">
              <SidebarItem
                isActive={pathname === "/dashboard/analytics"}
                title="View Analytics"
                icon={<BarChart />}
                href="/dashboard/analytics"
              />
            </SidebarMenu>

            {/* Following Activity Section */}
            <SidebarMenu title="Following Activity">
              <SidebarItem
                isActive={pathname === "/dashboard/following-activity"}
                title="Following Activity"
                icon={<Users />}
                href="/dashboard/following-activity"
              />
            </SidebarMenu>

            {/* Payments Section */}
            <SidebarMenu title="Payments">
              <SidebarItem
                isActive={pathname === "/dashboard/payments"}
                title="Payments"
                icon={<DollarSign />}
                href="/dashboard/payments"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
