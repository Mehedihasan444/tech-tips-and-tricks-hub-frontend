import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
  
  } from "@nextui-org/react";
import Searchbar from "../Searchbar";
import ProfileDropdown from "../ProfileDropdown";
import Link from "next/link";
  
  export default function NavigationBar() {
    return (
      <Navbar className="py-5" position="sticky" >
        <NavbarBrand className="text-2xl " >
          <Link href="/">
          <span className="  hover:text-teal-600 transition duration-300">
            TECH
          </span>
          <span className=" text-teal-600 hover:text-black transition duration-300">
            NEST
          </span>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* search ber */}
          <Searchbar />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ProfileDropdown />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }