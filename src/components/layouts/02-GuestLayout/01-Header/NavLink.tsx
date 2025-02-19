import React from "react";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
import { NavLinkProps } from "./types";

const NavLink: React.FC<NavLinkProps> = ({
  item,
  isActive,
  onClick,
  toggleSubmenu,
  isSubmenuOpen,
}) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  if (hasSubmenu) {
    return (
      <div className="group relative">
        <button
          className="group flex items-center transition-colors duration-300"
          onClick={toggleSubmenu}
        >
          <span
            className={`relative transition-colors duration-300 ${
              isActive ? "text-accent" : "text-white group-hover:text-accent"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </span>
          <HiChevronDown
            className={`ml-1 transition-transform duration-300 ${
              isActive ? "text-accent" : "text-white group-hover:text-accent"
            } ${isSubmenuOpen ? "rotate-180" : "rotate-0"}`}
            size={16}
          />
        </button>
      </div>
    );
  }

  return (
    <Link
      href={item.url}
      className="group relative transition-colors duration-300"
      onClick={onClick}
    >
      <span
        className={`relative transition-colors duration-300 ${
          isActive ? "text-accent" : "text-white group-hover:text-accent"
        }`}
      >
        {item.label}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </span>
    </Link>
  );
};

export default NavLink;
