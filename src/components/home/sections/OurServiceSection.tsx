import React from "react";
import { Camera, Image, Box } from "lucide-react";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 shadow-md">
    <Icon className="mb-4 h-12 w-12 text-primary" />
    <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
    <p className="text-primary">{description}</p>
  </div>
);

export default function OurServiceSection() {
  return (
    <section id="our-service" className="bg-zinc-100 px-4 py-12">
      <div className="container mx-auto w-full">
        <div className="mb-8">
          <h2 className="mb-2 text-sm font-semibold text-primary">
            OUR SERVICES
          </h2>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Professional Photo Booth</h1>
            <button className="rounded bg-primary px-4 py-2 text-white">
              All Services
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={Image}
            title="Basic Booth"
            description="Cocok untuk event besar dan kecil, dengan ukuran foto 2R, 4R, Polaroid."
          />
          <ServiceCard
            icon={Camera}
            title="Mini Booth"
            description="Solusi untuk acara kecil dengan fitur boomerang dan GIF"
          />
          <ServiceCard
            icon={Box}
            title="180 Booth"
            description="Efek foto dengan sudut pandang 180° yang futuristik menggunakan 6-12 kamera."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ServiceCard
            icon={Camera}
            title="Spin 360"
            description="Booth terpopuler dengan fitur video 360° menggunakan iPhone dan GoPro."
          />
          <div className="bg-primary p-6 text-white">
            <h3 className="mb-4 text-xl font-semibold text-white">
              All Products
            </h3>
            <p className="mb-4">
              Lihat semua produk kami, pastinya dengan harga yang relevan dan
              sertis yang profesional
            </p>
            <button className="flex items-center text-white">
              Lihat Selengkapnya
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
