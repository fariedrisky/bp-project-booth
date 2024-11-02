import Image from "next/image";
import Link from "next/link";
import { logo } from "@/data/images/logo";
import {
  AiOutlineInstagram,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-primary bg-foreground p-8 text-primary">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Logo and Tagline */}
        <div>
          <Image
            src={logo}
            alt="BP Project Booth"
            width={250}
            height={40}
            className="mb-2"
          />
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Contact Us:
          </h3>
          <div className="flex flex-col gap-2 text-primary">
            <div className="flex items-center gap-2">
              <Link
                href="https://wa.me/6285157316767"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineWhatsApp className="h-5 w-5" />
              </Link>
              <p>+62 851-5731-6767</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="mailto:bp.project835@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineMail className="h-5 w-5" />
              </Link>
              <p>bp.project835@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Follow Us:
          </h3>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/bp.projectbooth/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.tiktok.com/@bp.projectbooth"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="h-6 w-6" />
            </Link>
          </div>
          <span className="mt-2 block text-primary">BP Project Booth</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-primary">
        &copy; {new Date().getFullYear()} BP Project Booth. All rights reserved.
      </div>
    </footer>
  );
}
