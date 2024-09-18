// components/Footer.tsx

export default function Footer() {
	return (
		<footer className="bg-gray-800 p-4 text-center text-white">
			<p>
				&copy; {new Date().getFullYear()} Nama Usaha Anda. All rights
				reserved.
			</p>
		</footer>
	);
}
