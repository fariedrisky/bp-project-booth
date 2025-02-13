"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { logowhite } from "@/data/images/logo";
import { menu } from "@/data/HomeMenu";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/animation/motion";

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

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: -20 },
  };

  const renderMenuLinks = () =>
    menu.map((link: MenuItem, index: number) => (
      <motion.div
        key={link.href}
        custom={index}
        variants={menuItemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Link
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
      </motion.div>
    ));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-white border-opacity-20 bg-background bg-opacity-80 backdrop-blur-lg transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 xl:px-0">
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

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex lg:items-center lg:gap-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {renderMenuLinks()}
          </motion.nav>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            className="text-white lg:hidden"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-label={
              isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX size={30} />
                ) : (
                  <HiMenuAlt3 size={30} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="fixed inset-x-0 top-0 z-40 h-screen w-full bg-black bg-opacity-90 lg:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="container mx-auto flex h-full flex-col px-4 py-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Mobile Menu Links */}
              <motion.div
                className="flex flex-grow flex-col items-center justify-center gap-10"
                variants={staggerContainer}
              >
                {renderMenuLinks()}
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
