"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname untuk cek path yang aktif

export default function Navbar() {
	const pathname = usePathname(); // Ambil path saat ini
	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/products", label: "Products" },
		{ href: "/events", label: "Events" },
		{ href: "/about", label: "About Us" },
		{ href: "/login", label: "Login" },
	];

	return (
		<nav>
			<ul className="flex flex-col space-y-4 text-xl md:text-base md:flex-row md:space-x-4 md:space-y-0 font-medium">
				{navItems.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							className={`${
								pathname === item.href
									? "text-blue-700"
									: "text-black hover:text-gray-500"
							} px-3 py-2 rounded block`}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
