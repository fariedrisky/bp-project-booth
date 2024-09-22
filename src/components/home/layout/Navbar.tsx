"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import logo from "../../../../public/assets/images/logo-white.svg";
import { menu } from "@/data/HomeMenu";

// Define the type for menu items
type MenuItem = {
  href: string;
  label: string;
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const currentPage = usePathname();

  // Toggle mobile menu and manage body overflow for smooth scrolling
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
    document.body.style.overflow = isMobileMenuOpen ? "unset" : "hidden";
  };

  // Close the mobile menu on window resize (if the screen width is larger than 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, []);

  // Helper function to check if the current page matches the menu item
  const isActiveLink = (href: string) => currentPage === href;

  return (
    <>
      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white border-opacity-20 bg-background bg-opacity-80 backdrop-blur-lg transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 xl:px-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src={logo} alt="logo" width={250} height={40} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-10">
            {menu.map((link: MenuItem) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActiveLink(link.href) ? "text-primary" : "text-white"
                } transition-colors duration-300 hover:text-primary`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className="text-white lg:hidden"
            onClick={handleToggleMobileMenu}
            aria-label={
              isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
            }
          >
            {isMobileMenuOpen ? (
              <HiOutlineX size={30} />
            ) : (
              <HiMenuAlt3 size={30} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-30 backdrop-blur-md transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Navigation */}
      <nav
        className={`fixed inset-x-0 top-0 z-40 h-screen w-full bg-[#35302D] bg-opacity-90 transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex h-full flex-col px-4 py-4">
          {/* Mobile Menu Links */}
          <div className="flex flex-grow flex-col items-center justify-center gap-10">
            {menu.map((link: MenuItem) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActiveLink(link.href) ? "text-primary" : "text-white"
                } text-xl transition-colors duration-300 hover:text-primary`}
                onClick={handleToggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
