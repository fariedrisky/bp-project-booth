import type { ServiceType } from "@/components/ui/ServiceCard";

const boothTypes: ServiceType[] = [
    {
        id: "2r",
        title: "2R",
        description: "Basic Booth dengan ukuran 2R, cocok untuk berbagai acara",
        durationOptions: [
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
        image: [
            "/assets/images/services/2r.jpg",
            "/assets/images/services/2r-2.jpg"
        ],
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
            "Crew Stand By",
            "Lighting Set",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template",
            "Frame Luar Ready (Custom Frame Ask Admin)",
            "Include Guest Memories",
            "Media Sharing File (Barcode Support)",
            "Album Online",
            "Props (Boleh Direquest)",
            "Add on Backdrop Polos (Ask Admin)",
            "Available Keluar Kota (Ask Admin)"
        ],
    },
    {
        id: "polaroid",
        title: "Polaroid",
        description: "Basic Booth dengan format Polaroid yang klasik",
        durationOptions: [
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
        image: [
            "/assets/images/services/polaroid.jpg",
            "/assets/images/services/polaroid-2.jpg"
        ],
        templateImage: [
            "/assets/images/template-options/polaroid.jpg",
            "/assets/images/template-options/polaroid-result.jpg",
            "/assets/images/template-options/frame-option.jpg"
        ],
        templateOptions: [
            { value: "POL1", label: "Template POL1" },
            { value: "POL2", label: "Template POL2" },
        ],
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
            "Crew Stand By",
            "Lighting Set",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template",
            "Frame Luar Ready (Custom Frame Ask Admin)",
            "Include Guest Memories",
            "Media Sharing File (Barcode Support)",
            "Album Online",
            "Props (Boleh Direquest)",
            "Add on Backdrop Polos (Ask Admin)",
            "Available Keluar Kota (Ask Admin)"
        ],
    },
    {
        id: "4r-portrait",
        title: "4R Portrait",
        description: "Basic Booth ukuran 4R format portrait",
        durationOptions: [
            {
                value: "4h",
                label: "4 Jam",
            },
        ],
        image: [
            "/assets/images/services/4r-portrait.jpg",
            "/assets/images/services/4r-portrait-2.jpg",
            "/assets/images/services/4r-portrait-3.jpg"
        ],
        templateImage: [
            "/assets/images/template-options/4r-portrait.jpg",
            "/assets/images/template-options/result.jpg",
            "/assets/images/template-options/frame-option.jpg"
        ],
        templateOptions: [
            { value: "P1", label: "Template P1" },
            { value: "P2", label: "Template P2" },
            { value: "P3", label: "Template P3" },
            { value: "P4", label: "Template P4" },
            { value: "P5", label: "Template P5" },
            { value: "P6", label: "Template P6" },
            { value: "P7", label: "Template P7" },
            { value: "P8", label: "Template P8" },
            { value: "P9", label: "Template P9" },
            { value: "P10", label: "Template P10" },
        ],
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
            "Crew Stand By",
            "4 Jam Durasi Reguler (Add on Durasi Ask Admin)",
            "Lighting Set",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template",
            "Frame Luar Ready (Custom Frame Ask Admin)",
            "Media Sharing File (Barcode Support)",
            "Props (Boleh Direquest)",
            "Tidak Include Guest Memories",
            "Album Online",
            "Add on Backdrop Polos (Ask Admin)",
            "Available Keluar Kota (Ask Admin)"
        ],
    },
    {
        id: "4r-landscape",
        title: "4R Landscape",
        description: "Basic Booth ukuran 4R format landscape",
        durationOptions: [
            {
                value: "4h",
                label: "4 Jam",
            },
        ],
        image: ["/assets/images/services/4r-landscape.jpg"],
        templateImage: [
            "/assets/images/template-options/4r-landscape.jpg",
            "/assets/images/template-options/result.jpg",
            "/assets/images/template-options/frame-option.jpg"
        ],
        templateOptions: [
            { value: "L1", label: "Template L1" },
            { value: "L2", label: "Template L2" },
            { value: "L3", label: "Template L3" },
            { value: "L4", label: "Template L4" },
            { value: "L5", label: "Template L5" },
            { value: "L6", label: "Template L6" },
            { value: "L7", label: "Template L7" },
            { value: "L8", label: "Template L8" },
            { value: "L9", label: "Template L9" },
            { value: "L10", label: "Template L10" },
            { value: "L11", label: "Template L11" },
        ],
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
            "Crew Stand By",
            "4 Jam Durasi Reguler (Add on Durasi Ask Admin)",
            "Lighting Set",
            "Unlimited Boomerang & Gif Fitur",
            "Custom Template",
            "Frame Luar Ready (Custom Frame Ask Admin)",
            "Media Sharing File (Barcode Support)",
            "Props (Boleh Direquest)",
            "Tidak Include Guest Memories",
            "Album Online",
            "Add on Backdrop Polos (Ask Admin)",
            "Available Keluar Kota (Ask Admin)"
        ],
    },
];

export default boothTypes;