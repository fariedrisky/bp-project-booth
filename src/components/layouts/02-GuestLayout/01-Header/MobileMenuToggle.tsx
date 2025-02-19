import React from "react";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { MobileMenuToggleProps } from "./types";

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
    <motion.button
      className="text-white lg:hidden"
      onClick={toggleMobileMenu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
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
  );
};

export default MobileMenuToggle;
