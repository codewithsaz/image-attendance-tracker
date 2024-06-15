import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import useEmployeeStore from "../store/employeeStore";
import LogoutButton from "./Buttons/LogoutButton";

const Navabar = () => {
  const { employee } = useEmployeeStore((state) => ({
    employee: state.employee,
  }));
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Dashboard", "Attendance", "Leave"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1>Image</h1>
          <p className="font-bold text-inherit">Mobiles</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "text-orange-500" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            Dashboard
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/attendance-history"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "text-orange-500" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            View Attendance
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/leave-history"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "text-orange-500" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            View Leaves
          </NavLink>
        </NavbarItem>
        <>
          {employee.isAdmin ? (
            <NavbarItem>
              <NavLink
                to="/admin"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "text-orange-500" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                Admin Panel
              </NavLink>
            </NavbarItem>
          ) : (
            <></>
          )}
        </>

        <NavbarItem>
          <LogoutButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <LogoutButton />
      </NavbarMenu>
    </Navbar>
  );
};

export default Navabar;
