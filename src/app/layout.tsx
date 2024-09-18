// app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "400", "700"], // Sesuaikan dengan bobot yang Anda butuhkan
});

export const metadata = {
	title: "Nama Aplikasi Anda",
	description: "Deskripsi aplikasi Anda",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
