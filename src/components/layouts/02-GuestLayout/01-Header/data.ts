import { MenuItem } from "./types";

const menu: MenuItem[] = [
    { url: "/", label: "Home" },
    { url: "/about-us", label: "About Us" },
    {
        url: "/services",
        label: "Services",
        submenu: [
            { url: "/services/basic-booth", label: "Basic Booth" },
            { url: "/services/photobox", label: "Photobox" },
            { url: "/services/180-booth", label: "180 Booth" },
            { url: "/services/spin-360", label: "Spin 360" },
            { url: "/services/wide-angle", label: "Wide Angle Booth" },
            { url: "/services/phone-booth", label: "Phone Booth" },
        ]
    },
];

export default menu;
