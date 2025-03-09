import { Plus_Jakarta_Sans, Ibarra_Real_Nova } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Toaster } from "sonner";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibarra_real_nova = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibarra",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://bp-projectbooth.com"),
  title: "BP Project Booth | Layanan Photo Booth Modern",
  description:
    "BP Project Booth menyediakan layanan photo booth profesional dengan teknologi modern untuk berbagai acara seperti pernikahan, ulang tahun, dan acara perusahaan.",
  keywords: [
    "photo booth",
    "bp project",
    "bp project booth",
    "photo booth modern",
    "photo booth event",
    "photo booth aceh",
  ],
  openGraph: {
    title: "BP Project Booth | Layanan Photo Booth Modern",
    description:
      "Photo booth modern yang menghadirkan kenangan tak terlupakan di setiap acara Anda dengan teknologi terkini dan desain yang elegan",
    url: "https://bp-projectbooth.com",
    siteName: "BP Project Booth",
    images: [
      {
        url: "https://bp-projectbooth.com/assets/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "BP Project Booth Service",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: "https://bp-projectbooth.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" dir="ltr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="canonical" href="https://bp-projectbooth.com" />
      </head>
      <body className={`${plus_jakarta_sans.className} ${ibarra_real_nova.variable}`}>
        <Toaster position="top-center" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "BP Project Booth",
              description:
                "Layanan photo booth modern dengan teknologi terkini",
              url: "https://bp-projectbooth.com",
              logo: "https://bp-projectbooth.com/assets/images/logo.svg",
              image: "https://bp-projectbooth.com/assets/images/og-home.jpg",
              telephone: "+6281234567890",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Banda Aceh, Medan",
                addressRegion: "Aceh, Sumatera Utara",
                addressCountry: "ID",
              },
              priceRange: "Rp",
              sameAs: [
                "https://www.instagram.com/bp.projectbooth/",
                "https://www.facebook.com/bp.projectbooth",
              ],
            }),
          }}
        />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
