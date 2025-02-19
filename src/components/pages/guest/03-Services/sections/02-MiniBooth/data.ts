import { ServiceType } from "@/components/ui/ServiceCard";

const miniBoothTypes: ServiceType[] = [
    {
        id: "mirror-booth",
        title: "Mirror Booth Unlimited",
        description: "Self Service Mode dengan fitur lengkap untuk acara kecil",
        duration: "4 Jam",
        image: ["/assets/images/services/mirror-booth.jpg"],
        price: 4000000,
        features: [
            "Self Service Mode",
            "Unlimited Boomerang dan GIF",
            "Custom Template",
            "Frame Luar",
            "Include Guest Book",
            "Media Sharing File (Barcode Support)",
        ],
    },
    {
        id: "karaoke-booth",
        title: "Karaoke Booth",
        description: "Media hiburan karaoke dengan fitur rekam video",
        duration: "4 Jam",
        image: ["/assets/images/services/karaoke-booth.jpg"],
        price: 2500000,
        features: [
            "Sound Set",
            "Lighting",
            "Device Camera Record",
            "Custom Template",
            "Media Sharing File",
            "Props",
        ],
    },
];

export default miniBoothTypes;
