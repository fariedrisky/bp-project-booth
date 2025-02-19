import { ServiceType } from "@/components/ui/ServiceCard";

const phoneBoothTypes: ServiceType[] = [
    {
      id: "phone-booth-only",
      title: "Phone Booth (Only)",
      description: "Solusi booth sederhana dengan fokus pada pesan video",
      duration: "4 Jam",
      image: ["/assets/images/services/phone-booth.jpg"],
      price: 2000000,
      features: ["All File Message Video", "Media Sharing File"],
    },
  ];

export default phoneBoothTypes;
