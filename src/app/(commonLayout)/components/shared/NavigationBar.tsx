import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Searchbar from "../Searchbar";
import ProfileDropdown from "../ProfileDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Bell, MessageSquareText, } from "lucide-react";

export default function NavigationBar() {
  return (
    <Navbar className="pt-3" position="sticky">

      <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
        {/* search ber */}
        <Searchbar />

      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" radius="full">
            <Bell size={22} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" radius="full">
            <MessageSquareText size={22} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ProfileDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
