"use client";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import { CrownIcon, SquareUser } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
export default function ProfileDropdown() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);
    // Redirect to login page with current path as a redirect query parameter
    router.push(`/login?redirect=${pathname}`);
  };

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Avatar
          as="button"
          color="secondary"
          size="md"
          src={user?.profilePhoto}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={user?.name}
              description={user?.email}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: `${user?.profilePhoto}`,
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="my-profile"
            endContent={<SquareUser className="text-large" />}
          >
            <Link href={`/profile/${user?.nickName}`} aria-label={`/profile/${user?.nickName}`}>My Profile</Link>
          </DropdownItem>
          <DropdownItem key="about-us">
            <Link href="/about-us" aria-label={"about-us"}>About Us</Link>
          </DropdownItem>
          <DropdownItem key="contact-us">
            <Link href="/contact-us" aria-label={"contact-us"}>Contact Us</Link>
          </DropdownItem>
          <DropdownItem key="dashboard">
            <Link
              href={`${
                user?.role == "USER" ? "/dashboard" : "/admin-dashboard"
              }`} aria-label={`${
                user?.role == "USER" ? "/dashboard" : "/admin-dashboard"
              }`}
            >
              Dashboard
            </Link>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="get_subscription" endContent={<CrownIcon className="text-large text-orange-500" />}>
          <Link href="/subscription" aria-label={"subscription"}>Get Subscription</Link></DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" onClick={() => handleLogout()}>
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
