import { ServiceType } from "@/components/ui/ServiceCard";

const mirrorBoothTypes: ServiceType[] = [
    {
        id: "mirror-booth",
        title: "Mirror Booth Unlimited",
        description: "Self Service Mode dengan fitur lengkap untuk acara kecil",
        duration: "4 Jam",
        image: ["/assets/images/services/mirror-booth.jpg"],
        price: 5000000,
        features: [
            "Crew Stand By",
            "4 Jam Durasi Reguler (Add on Durasi Ask Admin)",
            "Lighting Set",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template",
            "Frame Luar Ready (Custom Frame Ask Admin)",
            "Media Sharing File (Barcode Support)",
            "Props (Boleh Direquest)",
            "Album Online",
            "Include Guest Memories",
            "Add on Backdrop Polos (Ask Admin)"
        ],
    },
];

export default mirrorBoothTypes;
