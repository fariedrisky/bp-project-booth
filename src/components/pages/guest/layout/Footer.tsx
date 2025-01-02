'use client'
import Image from "next/image";
import Link from "next/link";
import { logo } from "@/data/images/logo";
import {
  AiOutlineInstagram,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  slideInFromBottom,
} from "@/animation/motion";

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-primary bg-foreground p-8 text-primary shadow-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div
        className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4"
        variants={staggerContainer}
      >
        {/* Logo and Tagline */}
        <motion.div variants={fadeInUp}>
          <Image
            src={logo}
            alt="BP Project Booth"
            width={250}
            height={40}
            className="mb-2"
          />
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={fadeInUp}>
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Contact Us:
          </h3>
          <div className="flex flex-col gap-2 text-primary">
            <motion.div
              className="flex items-center gap-2"
              variants={slideInFromBottom(0.1)}
            >
              <Link
                href="https://wa.me/6285157316767"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineWhatsApp className="h-5 w-5 transition duration-300 hover:text-accent" />
              </Link>
              <p>+62 851-5731-6767</p>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              variants={slideInFromBottom(0.2)}
            >
              <Link
                href="mailto:bp.project835@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineMail className="h-5 w-5 transition duration-300 hover:text-accent" />
              </Link>
              <p>bp.project835@gmail.com</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div variants={fadeInUp}>
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Follow Us:
          </h3>
          <motion.div
            className="flex items-center gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={slideInFromBottom(0.3)}>
              <Link
                href="https://www.instagram.com/bp.projectbooth/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineInstagram className="h-6 w-6 transition duration-300 hover:text-accent" />
              </Link>
            </motion.div>
            <motion.div variants={slideInFromBottom(0.4)}>
              <Link
                href="https://www.tiktok.com/@bp.projectbooth"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="h-6 w-6 transition duration-300 hover:text-accent" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.span className="mt-2 block text-primary" variants={fadeInUp}>
            BP Project Booth
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-primary"
        variants={fadeInUp}
      >
        &copy; {new Date().getFullYear()} BP Project Booth. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
