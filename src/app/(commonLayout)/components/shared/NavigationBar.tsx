import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  Badge,
} from "@nextui-org/react";
import Searchbar from "../Searchbar";
import ProfileDropdown from "../ProfileDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Bell, MessageSquareText } from "lucide-react";

export default function NavigationBar() {
  return (
    <Navbar 
      maxWidth="full"
      className="border-b border-divider backdrop-blur-md bg-background/70 py-2" 
      position="sticky"
      isBordered
    >
      <NavbarContent className="hidden sm:flex gap-4 w-full flex-1" justify="center">
        {/* Search bar - now takes more space */}
        <div className="w-full max-w-2xl">
          <Searchbar />
        </div>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        {/* Theme Switcher */}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        {/* Notifications */}
        <NavbarItem>
          <Badge 
            content="5" 
            color="danger" 
            size="sm"
            placement="top-right"
            className="border-2 border-background"
          >
            <Button 
              isIconOnly 
              variant="light" 
              radius="full"
              className="hover:bg-default-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-default-600" />
            </Button>
          </Badge>
        </NavbarItem>

        {/* Messages */}
        <NavbarItem>
          <Badge 
            content="3" 
            color="primary" 
            size="sm"
            placement="top-right"
            className="border-2 border-background"
          >
            <Button 
              isIconOnly 
              variant="light" 
              radius="full"
              className="hover:bg-default-100 transition-colors"
              aria-label="Messages"
            >
              <MessageSquareText size={20} className="text-default-600" />
            </Button>
          </Badge>
        </NavbarItem>

        {/* Profile Dropdown */}
        <NavbarItem>
          <ProfileDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}