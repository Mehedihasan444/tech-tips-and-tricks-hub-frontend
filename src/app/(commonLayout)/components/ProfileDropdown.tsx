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
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:text-primary", // Changed to primary color for arrow
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Avatar
          as="button"
          color="primary" // Changed to primary color for consistency
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
            "data-[hover=true]:bg-primary/20", // Changed hover background to primary with opacity
            "data-[hover=true]:text-primary", // Changed hover text to primary
            "data-[selectable=true]:focus:text-primary", // Changed focus text to primary
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-primary", // Changed focus ring to primary
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
            endContent={<SquareUser className="text-large text-primary" />} // Added text-primary
            onClick={() => handleNavigation(`/profile/${user?.nickName}`)}
          >
            My Profile
          </DropdownItem>
          <DropdownItem
            key="about-us"
            onClick={() => handleNavigation(`/about-us`)}
          >
            About Us
          </DropdownItem>
          <DropdownItem
            key="contact-us"
            onClick={() => handleNavigation(`/contact-us`)}
          >
            Contact Us
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            onClick={() =>
              handleNavigation(
                user?.role === "USER" ? "/dashboard" : "/admin-dashboard"
              )
            }
          >
            Dashboard
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem
            key="get_subscription"
            endContent={<CrownIcon className="text-large text-secondary" />} // Changed to secondary color
            onClick={() => handleNavigation(`/subscription`)}
          >
            Get Subscription
          </DropdownItem>
          <DropdownItem
            key="help_and_feedback"
            onClick={() => handleNavigation(`/contact-us`)} // Changed to contact-us for proper routing
          >
            Help & Feedback
          </DropdownItem>
          <DropdownItem 
            key="logout" 
            className="text-danger" // Added danger color for logout
            onClick={() => handleLogout()}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
