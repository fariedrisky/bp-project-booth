import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/animation/motion";
import { NavigationProps } from "./types";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

const DesktopNavigation: React.FC<NavigationProps> = ({
  menu,
  isActiveLink,
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const pathname = usePathname();

  // Close submenu when route changes
  useEffect(() => {
    setExpandedItems([]);
  }, [pathname]);

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
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
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
    <motion.nav
      className="hidden lg:flex lg:items-center lg:gap-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {menu.map((item, index) => {
        const isSubmenuOpen = expandedItems.includes(index);

        // Determine if the item is a service dropdown that needs position adjustment
        const isServiceDropdown =
          item.label === "Services" || item.url.includes("services");

        return (
          <div key={item.url} className="relative">
            <motion.div
              custom={index}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <NavLink
                item={item}
                isActive={isActiveLink(item.url)}
                onClick={() => {}}
                toggleSubmenu={() => toggleSubmenu(index)}
                isSubmenuOpen={isSubmenuOpen}
              />
            </motion.div>

            {/* Submenu with conditional position adjustment */}
            {item.submenu && (
              <AnimatePresence>
                {isSubmenuOpen && (
                  <motion.div
                    className={`absolute z-50 mt-2 ${
                      isServiceDropdown ? "left-0 right-auto" : "left-0"
                    } w-56 origin-top-left bg-background bg-opacity-80 p-2 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg focus:outline-none`}
                    variants={submenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <motion.div
                          key={subItem.url}
                          variants={menuItemVariants}
                        >
                          <Link
                            href={subItem.url}
                            className={`flex items-center rounded px-4 py-2 text-sm transition-colors ${
                              isActiveLink(subItem.url)
                                ? "text-accent"
                                : "text-gray-300 hover:text-accent"
                            }`}
                          >
                            <span className="mr-4 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-current opacity-70"></span>
                            {subItem.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </motion.nav>
  );
};

export default DesktopNavigation;
