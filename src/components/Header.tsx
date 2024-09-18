"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"; // Import Shadcn Sheet
import Navbar from "./Navbar";
import { FiMenu } from "react-icons/fi"; // Import Burger Icon (React Icons)
import Link from "next/link";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false); // State for handling Sheet visibility

	// Effect to close the sheet if the window resizes to a desktop view
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 767 && isOpen) {
				// If window width is greater than or equal to 768px (md breakpoint) and the sheet is open, close it
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize); // Listen for window resize
		return () => {
			window.removeEventListener("resize", handleResize); // Cleanup the event listener on unmount
		};
	}, [isOpen]);

	return (
		<header className="w-full bg-white font-medium sticky border-b border-gray-200 top-0 z-50">
			<div className="container mx-auto p-6 flex justify-between items-center">
				{/* Logo atau Judul Usaha */}
				<div className="flex items-center">
					<Link href="/" aria-label="Go to Home Page">
						<Image
							src="/assets/images/bp-projectbooth.png"
							alt="Project Booth Logo"
							width={150}
							height={150}
							className="mr-4"
						/>
					</Link>
				</div>

				{/* Navbar di sisi kanan untuk layar besar */}
				<div className="hidden md:block">
					<Navbar />
				</div>

				{/* Burger Icon for Mobile */}
				<div className="block md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<button
								aria-label="Open Menu"
								onClick={() => setIsOpen(true)}
							>
								<FiMenu size={30} className="text-black" />
							</button>
						</SheetTrigger>
						<SheetContent side="left" className="p-4">
							<Navbar />
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
