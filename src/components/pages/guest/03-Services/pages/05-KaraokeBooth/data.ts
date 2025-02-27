import { ServiceType } from "@/components/ui/ServiceCard";

const karaokeBoothTypes: ServiceType[] = [
    {
        id: "karaoke-booth",
        title: "Karaoke Booth Custom Booth (Add On)",
        description: "Media hiburan karaoke dengan fitur rekam video",
        duration: "4 Jam",
        image: ["/assets/images/services/karaoke-booth.jpg"],
        price: 3000000,
        features: [
            "Crew Stand By",
            "Karaoke Set",
            "Sound Set Lengkap",
            "Custom Template",
            "Lighting Set",
            "Media Sharing File (Barcode Support)",
            "Album Online",
            "Props (Boleh Direquest)"
        ],
    },
];

export default karaokeBoothTypes;
