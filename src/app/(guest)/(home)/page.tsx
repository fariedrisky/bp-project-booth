import type { Metadata } from "next";
import BpSection from "@/components/pages/guest/01-Home/sections/02-Bp";
import HeroSection from "@/components/pages/guest/01-Home/sections/01-Hero";
import OurServiceSection from "@/components/pages/guest/01-Home/sections/03-OurService";

export const metadata: Metadata = {
  title: "BP Project Booth | Photo Booth Modern Indonesia",
  description:
    "Hadir mengabadikan setiap momen dengan photo booth modern yang menggunakan teknologi terkini dan desain yang elegan untuk berbagai acara di Indonesia.",
  keywords: [
    "photo booth",
    "bp project",
    "bp project booth",
    "photo booth modern",
    "photo booth event",
    "photo booth aceh",
  ],
  alternates: {
    canonical: "https://bp-projectbooth.com",
  },
  openGraph: {
    title: "BP Project Booth | Photo Booth Modern Indonesia",
    description:
      "Hadir mengabadikan setiap momen dengan photo booth modern untuk berbagai acara",
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
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BpSection />
      <OurServiceSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BP Project Booth",
            url: "https://bp-projectbooth.com",
            logo: "https://bp-projectbooth.com/assets/images/logo.svg",
            sameAs: [
              "https://www.instagram.com/bp.projectbooth/",
              "https://www.facebook.com/bp.projectbooth",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+6285157316767",
              contactType: "customer service",
              availableLanguage: ["Indonesian", "English"],
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "IDR",
              highPrice: "5000000",
              lowPrice: "1500000",
              offerCount: "3",
            },
          }),
        }}
      />
    </main>
  );
}
