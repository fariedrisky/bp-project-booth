"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { logowhite } from "@/data/images/logo";
import { menu } from "@/data/HomeMenu";

// Define the type for menu items
type MenuItem = {
  href: string;
  label: string;
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPage = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
    document.body.style.overflow = isMobileMenuOpen ? "unset" : "hidden";
  };

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

  const isActiveLink = (href: string) => currentPage === href;

  const renderMenuLinks = () =>
    menu.map((link: MenuItem) => (
      <Link
        key={link.href}
        href={link.href}
        className={`relative transition-colors duration-300 ${
          isActiveLink(link.href)
            ? "text-accent after:w-full"
            : "text-white after:w-0 hover:after:w-full"
        } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300`}
        onClick={() => isMobileMenuOpen && toggleMobileMenu()}
      >
        {link.label}
      </Link>
    ));

  return (
    <>
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white border-opacity-20 bg-background bg-opacity-80 backdrop-blur-lg transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 xl:px-0">
          <Link href="/">
            <Image
              src={logowhite}
              alt="logo"
              width={250}
              height={40}
              className="flex-shrink-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-10">
            {renderMenuLinks()}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className="text-white lg:hidden"
            onClick={toggleMobileMenu}
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
        className={`fixed inset-x-0 top-0 z-40 h-screen w-full bg-black bg-opacity-90 transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex h-full flex-col px-4 py-4">
          {/* Mobile Menu Links */}
          <div className="flex flex-grow flex-col items-center justify-center gap-10">
            {renderMenuLinks()}
          </div>
        </div>
      </nav>
    </>
  );
}
