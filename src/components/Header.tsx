// components/Header.tsx

import Navbar from "./Navbar";

export default function Header() {
	return (
		<header className="w-full bg-gray-800 sticky top-0 z-50">
			<div className="container mx-auto p-4">
				{/* Logo atau Judul Usaha */}
				<div className="flex justify-between items-center">
					<div className="text-white text-2xl font-bold">
						Nama Usaha Anda
					</div>
				</div>

				{/* Navbar */}
				<Navbar />
			</div>
		</header>
	);
}
