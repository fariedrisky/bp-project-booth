import Image from "next/image";
import React from "react";
import { heroBackground } from "@/helpers/heroImages";

export default function IntroSection() {
  return (
    <section id="bp-section" className="bg-background py-16 text-secondary">
      <div className="container mx-auto flex flex-col items-center px-4">
        <Image
          src={heroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          style={{
            backgroundBlendMode: "lighten",
            opacity: "20%",
            zIndex: -2,
          }}
        />
        <h2 className="mb-4 text-center text-2xl font-bold">
          Selamat Datang di Bp Project Booth
        </h2>
        <p className="text-center">
          Bp Project Booth adalah perusahaan yang bergerak di bidang photo
          booth, dengan proses operasi yang didukung oleh teknologi modern.
          Didirikan pada tahun 2018, kami telah berulang kali berhasil memenuhi
          permintaan konsumen sesuai ekspektasi hingga saat ini. Tidak hanya
          melayani event skala besar, Bp Project Booth juga menyesuaikan layanan
          kami untuk event skala kecil seperti pesta ulang tahun, bridal shower,
          dan pertunangan. Kehadiran photo booth memberikan nuansa yang unik
          dalam setiap acara. Selain mengabadikan momen bahagia dalam bentuk
          gambar, kehadiran kami turut meningkatkan citra acara, menjadikannya
          lebih berkesan bagi penyelenggara dan tamu.
        </p>
      </div>
    </section>
  );
}
