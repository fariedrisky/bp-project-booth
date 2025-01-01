import React from "react";
import { SlScreenSmartphone } from "react-icons/sl";
import { MdOutlinePanoramaWideAngle } from "react-icons/md";
import { TbView360Arrow } from "react-icons/tb";
import { GrRotateRight } from "react-icons/gr";
import { LiaPersonBoothSolid } from "react-icons/lia";
import { RiPolaroid2Line } from "react-icons/ri";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  button,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  button?: React.ReactNode; // Tetap opsional
}) => (
  <div className="cursor-pointer bg-white p-6 transition duration-300 hover:scale-105 hover:drop-shadow-2xl">
    {Icon && <Icon className="mb-4 h-12 w-12 text-primary" />}{" "}
    {/* Render hanya jika Icon tersedia */}
    <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
    <p className="text-primary">{description}</p>
    {button && <div className="mt-4">{button}</div>}
  </div>
);

export default function OurService() {
  return (
    <section id="our-service" className="bg-foreground px-4 py-12">
      <div className="container mx-auto w-full">
        <div className="mb-8">
          <h2 className="mb-2 text-sm font-semibold text-primary">
            OUR SERVICES
          </h2>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">
              Professional Photo Booth
            </h1>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={RiPolaroid2Line}
            title="Basic Booth"
            description="Cocok untuk event besar dan kecil, dengan ukuran foto 2R, 4R, Polaroid."
          />
          <ServiceCard
            icon={LiaPersonBoothSolid}
            title="Mini Booth"
            description="Solusi untuk acara kecil dengan fitur boomerang dan GIF"
          />
          <ServiceCard
            icon={GrRotateRight}
            title="180 Booth"
            description="Efek foto dengan sudut pandang 180° yang futuristik menggunakan 6-12 kamera."
          />
          <ServiceCard
            icon={TbView360Arrow}
            title="Spin 360"
            description="Booth terpopuler dengan fitur video 360° menggunakan iPhone dan GoPro."
          />
          <ServiceCard
            icon={MdOutlinePanoramaWideAngle}
            title="Wide Angle Booth"
            description="Booth dengan lensa sudut lebar untuk menangkap momen lebih luas dan detail."
          />
          <ServiceCard
            icon={SlScreenSmartphone}
            title="Phone Booth"
            description="Booth modern untuk merekam video message kreatif dari para tamu."
          />
        </div>
      </div>
    </section>
  );
}
