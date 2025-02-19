"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { logowhite } from "@/data/images/logo";
import menu from "@/components/layouts/02-GuestLayout/01-Header/data";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import MobileMenuToggle from "./MobileMenuToggle";

export default function Header() {
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

  // Check if current page is active or if any submenu item is active
  const isActiveLink = (href: string) => {
    if (currentPage === href) return true;

    // Check if the current page is a child of this item
    if (currentPage?.startsWith(href) && href !== "/") return true;

    return false;
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-white border-opacity-20 bg-background bg-opacity-80 backdrop-blur-lg transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 xl:px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Image
                src={logowhite}
                alt="logo"
                width={120}
                className="flex-shrink-0"
              />
            </Link>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <DesktopNavigation menu={menu} isActiveLink={isActiveLink} />

            {/* Mobile Menu Toggle Button */}
            <MobileMenuToggle
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNavigation
        isMobileMenuOpen={isMobileMenuOpen}
        menu={menu}
        isActiveLink={isActiveLink}
        toggleMobileMenu={toggleMobileMenu}
      />
    </>
  );
}
