import { ServiceType } from "@/components/ui/ServiceCard";

const phoneBoothTypes: ServiceType[] = [
  {
    id: "phone-booth-only",
    title: "Phone Booth (Only)",
    description: "Solusi booth sederhana dengan fokus pada pesan video",
    durationOptions: [
      {
        value: "4h",
        label: "4 Jam",
      },
    ],
    image: ["/assets/images/services/phone-booth.jpg"],
    price: 2000000,
    features: [
      "Crew Stand By",
      "4 Jam Durasi Reguler",
      "Include Booth Phone",
      "Lighting Set",
      "Unlimited Video Message",
      "Custom Template",
      "Album Online",
      "Media Sharing File (Barcode Support)",
      "Props (Boleh Direquest)",
      "Available Keluar Kota (Ask Admin)"

    ],
  },
];

export default phoneBoothTypes;
