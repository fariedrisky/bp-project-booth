"use client";
import React from "react";
import BasicBooth from "./sections/01-BasicBooth";
import PhotoBox from "./sections/02-PhotoBox";
import Booth180 from "./sections/03-180Booth";
import { WideAngleBooth } from "./sections/05-WideAngleBooth";
import { PhoneBooth } from "./sections/06-PhoneBooth";
import Spin360 from "./sections/04-Spin360";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { heroBackground } from "@/data/images/heroImages";
import { motion, Variants } from "framer-motion";

const ServiceNav = () => {
  const [activeSection, setActiveSection] = React.useState("basic");
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "basic",
        "photobox",
        "180",
        "spin360",
        "wideangle",
        "phone",
      ];

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navItems = [
    { id: "basic", label: "Basic Booth" },
    { id: "photobox", label: "Mini Booth" },
    { id: "180", label: "180° Booth" },
    { id: "spin360", label: "Spin 360°" },
    { id: "wideangle", label: "Wide Angle" },
    { id: "phone", label: "Phone Booth" },
  ];

  const buttonVariants: Variants = {
    initial: {
      x: 0,
      opacity: 1,
    },
    hover: {
      x: isOpen ? -8 : 8,
      opacity: [1, 0.7, 1],
      transition: {
        x: {
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
        },
        opacity: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
  };

  const iconVariants: Variants = {
    initial: { rotate: 0 },
    open: {
      rotate: 180,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="fixed right-0 top-1/2 z-20 -translate-y-1/2">
      <div className="relative flex items-center justify-end">
        {/* Navigation Menu */}
        <div
          className={cn(
            "absolute right-12 w-40 transition-all duration-300",
            isOpen
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-8 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-3 bg-black/80 p-4 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "rounded-sm px-4 py-2.5 text-sm font-medium transition-all",
                  activeSection === item.id
                    ? "bg-accent text-white"
                    : "text-gray-300 hover:bg-accent/10",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Toggle Button */}
        <motion.button
          onClick={toggleMenu}
          className="relative p-2 text-white transition-all duration-300 hover:text-accent"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={iconVariants}
            animate={isOpen ? "open" : "initial"}
          >
            <ChevronLeft className="hidden md:block" size={50} />
            <ChevronLeft className="block md:hidden" size={20} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

const Service = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        {/* Background Image */}
        <Image
          src={heroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-20 mix-blend-lighten"
        />
        <ServiceNav />
        <div className="space-y-24">
          <section id="basic">
            <BasicBooth />
          </section>
          <section id="photobox">
            <PhotoBox />
          </section>
          <section id="180">
            <Booth180 />
          </section>
          <section id="spin360">
            <Spin360 />
          </section>
          <section id="wideangle">
            <WideAngleBooth />
          </section>
          <section id="phone">
            <PhoneBooth />
          </section>
        </div>
      </div>
    </>
  );
};

export default Service;
