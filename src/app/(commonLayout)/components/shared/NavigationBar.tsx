import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Searchbar from "../Searchbar";
import ProfileDropdown from "../ProfileDropdown";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Bell, Search } from "lucide-react";

export default function NavigationBar() {
  return (
    <Navbar className="py-5" position="sticky">
      {/* <NavbarBrand className=" ">
        <Link href="/">
          <span className=" text-2xl font-bold text-teal-600 transition duration-300 font-serif ">
            TECHNEST
          </span>
        </Link>
      </NavbarBrand> */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* search ber */}
        {/* <Searchbar /> */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="search"
              placeholder="Search tech tips..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" radius="full">
            <Bell size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ProfileDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
