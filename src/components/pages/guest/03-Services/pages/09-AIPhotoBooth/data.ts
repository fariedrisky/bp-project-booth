import { ServiceType } from "@/components/ui/ServiceCard";

const aiPhotoboothTypes: ServiceType[] = [
  {
    id: "ai-photobooth",
    title: "AI Photobooth",
    description: "Layanan photo booth dengan teknologi AI dan cetak foto unlimited ukuran 4R",
    duration: "4 Jam",
    image: ["/assets/images/services/ai-photobooth.jpg"],
    price: 7000000,
    features: [
      "Crew Stand By",
      "4 Jam Durasi Reguler (Add on Durasi Ask Admin)",
      "Include 4R Print Out Unlimited",
      "Lighting Set",
      "Frame Luar Ready (Custom Frame Ask Admin)",
      "Custom Template",
      "Album Online",
      "Media Sharing File (Barcode Support)",
      "Props (Boleh Direquest)",
      "Available Keluar Kota (Ask Admin)"
    ],
  }
];

export default aiPhotoboothTypes;
