import { DM_Sans, Ibarra_Real_Nova } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Toaster } from "sonner";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibarra_real_nova = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibarra",
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
      <body className={`${dm_sans.className} ${ibarra_real_nova.variable}`}>
        <Toaster position="top-center" />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
