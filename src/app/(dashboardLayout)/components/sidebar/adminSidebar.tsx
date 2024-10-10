import { Avatar, Tooltip } from "@nextui-org/react";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

import { BackpackIcon, Banknote, Car, CreditCardIcon, FileClock, FileStack, FileText, Home, User } from "lucide-react";
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
          <Link href="/" className="text-2xl font-semibold">
            <span className="hover:text-teal-600 transition duration-300">
              TECH
            </span>
            <span className="text-teal-600 hover:text-black transition duration-300">
              NEST
            </span>
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
                items={[{title:"Banks Accounts",
                  icon: <BackpackIcon/>
                }, {title:"Credit Cards",
                  icon: <CreditCardIcon/>
                }]}
                title="Balances"
              />
              {/* <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<Home />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<Home />}
              /> */}
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