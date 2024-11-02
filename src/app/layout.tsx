// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import GuestLayout from "@/components/guest/layout";
import AuthLayout from "@/components/auth/layout";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Toaster } from "sonner";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  // Ambil status autentikasi dari cookie
  const isAuthenticated = cookies().get("isAuthenticated")?.value === "true";

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {isAuthenticated ? (
          <AuthLayout>
            <ScrollToTop />
            {children}
            <Toaster position="top-center" />
          </AuthLayout>
        ) : (
          <GuestLayout>
            <ScrollToTop />
            {children}
            <Toaster position="top-center" />
          </GuestLayout>
        )}
      </body>
    </html>
  );
}
