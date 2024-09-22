// app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/layout/Navbar";
import Footer from "@/components/home/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Sesuaikan dengan bobot yang Anda butuhkan
});

export const metadata = {
  title: "BP Project Booth",
  description: "Deskripsi aplikasi Anda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
