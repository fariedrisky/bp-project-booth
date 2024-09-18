// components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
	return (
		<nav>
			<ul className="flex space-x-4">
				<li>
					<Link href="/" className="text-white hover:text-gray-300">
						Profil Usaha
					</Link>
				</li>
				<li>
					<Link
						href="/products"
						className="text-white hover:text-gray-300"
					>
						Produk
					</Link>
				</li>
				<li>
					<Link
						href="/invoices"
						className="text-white hover:text-gray-300"
					>
						Invoice
					</Link>
				</li>
				<li>
					<Link
						href="/login"
						className="text-white hover:text-gray-300"
					>
						Login
					</Link>
				</li>
			</ul>
		</nav>
	);
}
