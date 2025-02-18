import { ServiceType } from "@/components/ui/ServiceCard";

const spin360Types: ServiceType[] = [
    {
        id: "spin-360",
        title: "Spin 360°",
        description:
            "Booth terpopuler dengan fitur video 360° menggunakan iPhone dan GoPro",
        duration: "3-4 Jam",
        image: "/assets/images/services/spin-360.jpg",
        durationOptions: [
            // Menggunakan durationOptions untuk pilihan durasi
            {
                value: "3h",
                label: "3 Jam",
                price: 2000000,
            },
            {
                value: "4h",
                label: "4 Jam",
                price: 2500000,
            },
        ],
        features: [
            "Lighting",
            "Device iPhone",
            "Custom Template",
            "Media Sharing File",
            "Props",
        ],
    },
    {
        id: "spin-360-bundle",
        title: "Spin 360° + 2R",
        description: "Bundling package Spin 360° dengan cetak foto 2R",
        duration: "4 Jam",
        image: "/assets/images/services/spin-360-2r.jpg",
        templateImage: [
            "/assets/images/template-options/2r.jpg",
            "/assets/images/template-options/result.jpg",
            "/assets/images/template-options/frame-option.jpg"
        ],
        templateOptions: [
            { value: "S1", label: "Template S1" },
            { value: "S2", label: "Template S2" },
            { value: "S3", label: "Template S3" },
            { value: "S4", label: "Template S4" },
            { value: "S5", label: "Template S5" },
            { value: "S6", label: "Template S6" },
            { value: "S7", label: "Template S7" },
            { value: "S8", label: "Template S8" },
        ],
        printOptions: [
            {
                value: "400",
                label: "400 lembar",
                price: 4000000,
            },
            {
                value: "unlimited",
                label: "Unlimited",
                price: 5000000,
            },
        ],
        features: [
            "Lighting",
            "Device iPhone",
            "Custom Template",
            "Media Sharing File",
            "Props",
        ],
    },
];

export default spin360Types;
