import { ServiceType } from "@/components/ui/ServiceCard";

const wideAngleTypes: ServiceType[] = [
    {
        id: "wide-angle-unlimited",
        title: "Wide Angle Unlimited Polaroid",
        description:
            "Wide Angle Booth dengan format Polaroid dan memiliki fitur boomerang & GIF",
        durationOptions: [
            {
                value: "4h",
                label: "4 Jam",
            },
        ],
        image: ["/assets/images/services/wide-angle.jpg"],
        price: 5000000,
        features: [
            "Crew Stand By",
            "4 Jam Durasi Reguler (Add on Durasi Ask Admin)",
            "Boleh Custom Warna Backdrop",
            "Lighting Set",
            "Wide Lensa",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template",
            "Frame Luar (Custom Frame Ask Admin)",
            "Media Sharing File (Barcode Support)",
            "Album Online",
            "Include Guest Memories",
            "Props (Boleh Direquest)",
            "Available Keluar Kota (Ask Admin)"
        ],
    },
];

export default wideAngleTypes;
