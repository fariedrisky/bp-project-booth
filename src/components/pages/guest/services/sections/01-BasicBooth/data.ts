import type { ServiceType } from "@/components/ui/ServiceCard";

const boothTypes: ServiceType[] = [
    {
        id: "2r",
        title: "2R",
        description: "Basic Booth dengan ukuran 2R, cocok untuk berbagai acara",
        duration: "4 Jam",
        image: "/assets/images/services/2r.jpg",
        printOptions: [
            {
                value: "300",
                label: "300 lembar",
                price: 2000000,
            },
            {
                value: "unlimited",
                label: "Unlimited",
                price: 3500000,
            },
        ],
        features: [
            "Unlimited Boomerang dan GIF",
            "Custom Template",
            "Frame Luar",
            "Include Guest Book",
            "Media Sharing File (Barcode Support)",
        ],
    },
    {
        id: "polaroid",
        title: "Polaroid",
        description: "Basic Booth dengan format Polaroid yang klasik",
        duration: "4 Jam",
        image: "/assets/images/services/polaroid.jpg",
        printOptions: [
            {
                value: "300",
                label: "300 lembar",
                price: 2000000,
            },
            {
                value: "unlimited",
                label: "Unlimited",
                price: 3500000,
            },
        ],
        features: [
            "Unlimited Boomerang dan GIF",
            "Custom Template",
            "Frame Luar",
            "Include Guest Book",
            "Media Sharing File (Barcode Support)",
        ],
    },
    {
        id: "4r-portrait",
        title: "4R Portrait",
        description: "Basic Booth ukuran 4R format portrait",
        duration: "4 Jam",
        image: "/assets/images/services/4r-portrait.jpg",
        printOptions: [
            {
                value: "400",
                label: "400 lembar",
                price: 3500000,
            },
            {
                value: "unlimited",
                label: "Unlimited",
                price: 4500000,
            },
        ],
        features: [
            "Unlimited Boomerang dan GIF",
            "Custom Template",
            "Frame Luar",
            "Media Sharing File (Barcode Support)",
        ],
    },
    {
        id: "4r-landscape",
        title: "4R Landscape",
        description: "Basic Booth ukuran 4R format landscape",
        duration: "4 Jam",
        image: "/assets/images/services/4r-landscape.jpg",
        printOptions: [
            {
                value: "400",
                label: "400 lembar",
                price: 3500000,
            },
            {
                value: "unlimited",
                label: "Unlimited",
                price: 4500000,
            },
        ],
        features: [
            "Unlimited Boomerang dan GIF",
            "Fitur Custom Template",
            "Frame Luar",
            "Media Sharing File (Barcode Support)",
        ],
    },
];

export default boothTypes;
