import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { staggerContainer } from "@/animation/motion";
import { MobileNavigationProps } from "./types";
import NavLink from "./NavLink";

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isMobileMenuOpen,
  menu,
  isActiveLink,
  toggleMobileMenu,
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

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

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const toggleSubmenu = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <>
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="fixed inset-x-0 top-0 z-40 h-screen w-full overflow-y-auto bg-black bg-opacity-90 lg:hidden"
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
              {/* Mobile Menu Links with proper alignment */}
              <motion.div
                className="flex flex-grow flex-col items-center justify-center space-y-10"
                variants={staggerContainer}
              >
                {menu.map((item, index) => {
                  const isSubmenuOpen = expandedItems.includes(index);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;

                  return (
                    <div key={item.url} className="relative w-44 text-center">
                      <motion.div
                        custom={index}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {hasSubmenu ? (
                          <>
                            <button
                              className={`w-full text-center text-xl ${
                                isActiveLink(item.url)
                                  ? "text-accent"
                                  : "text-white"
                              }`}
                              onClick={() => toggleSubmenu(index)}
                            >
                              <span className="inline-flex items-center">
                                {item.label}
                                <HiChevronDown
                                  className={`ml-1 transition-transform duration-300 ${
                                    isSubmenuOpen ? "rotate-180" : "rotate-0"
                                  }`}
                                  size={20}
                                />
                              </span>
                            </button>

                            <AnimatePresence>
                              {isSubmenuOpen && (
                                <motion.div
                                  className="mt-4 space-y-4"
                                  variants={submenuVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                >
                                  {item.submenu?.map((subItem) => (
                                    <Link
                                      key={subItem.url}
                                      href={subItem.url}
                                      className={`block text-center text-xl ${
                                        isActiveLink(subItem.url)
                                          ? "text-accent"
                                          : "text-gray-300 hover:text-white"
                                      }`}
                                      onClick={toggleMobileMenu}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <div className="text-xl">
                            <NavLink
                              item={item}
                              isActive={isActiveLink(item.url)}
                              onClick={toggleMobileMenu}
                            />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
