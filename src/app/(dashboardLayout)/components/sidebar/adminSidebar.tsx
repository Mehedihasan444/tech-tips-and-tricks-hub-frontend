import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

import {
  BackpackIcon,
  Banknote,
  CreditCardIcon,
  FileClock,
  FileStack,
  FileText,
  Home,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../../layout/layout-context";

export const AdminSidebarWrapper = () => {
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
          {" "}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TechNest
            </h1>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/admin-dashboard"}
              href="/admin-dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/admin-dashboard/posts-management"}
                title="posts manage"
                icon={<FileText />}
                href="/admin-dashboard/posts-management"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/users-management"}
                title="users manage"
                icon={<User />}
                href="/admin-dashboard/users-management"
              />
              <CollapseItems
                icon={<Banknote />}
                title="Amount Transactions"
                items={[
                  {
                    title: "Author",
                    icon: <BackpackIcon />,
                    href : "/admin-dashboard/author-transactions",
                  },
                  {
                    title: "User",
                    icon: <CreditCardIcon />,
                    href : "/admin-dashboard/user-transactions",
                  },
                ]}
              />

              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<FileStack />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<FileClock />}
              />
            </SidebarMenu>
          </div>
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <Home />
              </div>
            </Tooltip>
            
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};
