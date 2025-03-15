import { MenuItem } from "./types";

const menu: MenuItem[] = [
    { url: "/", label: "Home" },
    { url: "/about-us", label: "About Us" },
    {
        url: "/services",
        label: "Services",
        submenu: [
            { url: "/services/basic-booth", label: "Basic Booth" },
            { url: "/services/mirror-booth", label: "Mirror Booth" },
            { url: "/services/180-booth", label: "180 Booth" },
            { url: "/services/spin-360", label: "Spin 360" },
            { url: "/services/karaoke-booth", label: "Karaoke Booth" },
            { url: "/services/wide-angle", label: "Wide Angle Booth" },
            { url: "/services/photobox", label: "Photo Box" },
            { url: "/services/phone-booth", label: "Phone Booth" },
            { url: "/services/ai-photobooth", label: "AI Photobooth" },
        ]
    },
];

export default menu;
