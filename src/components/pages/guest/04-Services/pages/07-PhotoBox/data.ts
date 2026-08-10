import { ServiceType } from "@/components/ui/ServiceCard";

const photoBoxTypes: ServiceType[] = [
    {
        id: "photo-box-2r-unlimited",
        title: "Photo Box 2R Unlimited",
        description: "Layanan photo box dengan cetak foto unlimited ukuran 2R",
        durationOptions: [
            {
                value: "5h",
                label: "5 Jam",
            },
        ],
        image: ["/assets/images/services/photo-box-2r.jpg"],
        price: 8000000,
        features: [
            "Crew Stand By",
            "5 Jam Durasi Reguler (Add on Durasi Ask Admin)",
            "Set Photobox",
            "Lighting Set",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template (Include Lebih Dari 1 Template)",
            "Media Sharing File (Barcode Support)",
            "Album Online",
            "Props (Boleh Direquest)",
            "Available Keluar Kota (Ask Admin)"
        ],
    }
];

export default photoBoxTypes;
