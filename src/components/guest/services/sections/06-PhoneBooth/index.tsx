import ServiceCard, { ServiceType } from "@/components/ui/ServiceCard";
import { heroBackground } from "@/data/images/heroImages";
import { cn } from "@/lib/utils";
import Image from "next/image";

const phoneBoothTypes: ServiceType[] = [
  {
    id: "phone-booth-only",
    title: "Phone Booth (Only)",
    description: "Solusi booth sederhana dengan fokus pada pesan video",
    duration: "4 Jam",
    type: "Phone",
    image: "/assets/images/services/2r.jpg",
    price: 2000000,
    features: ["All File Message Video", "Media Sharing File"],
  },
];

export const PhoneBooth = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={heroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-20 mix-blend-lighten"
        />
      </div>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="font-serif text-2xl font-bold md:text-3xl">
          Phone Booth
        </h2>
        <p className="mt-2 text-gray-600">
          Booth sederhana untuk mengabadikan pesan video
        </p>
      </div>
      <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6">
        {phoneBoothTypes.map((booth) => (
          <div key={booth.id} className="mx-auto w-full max-w-[389px]">
            <ServiceCard service={booth} variant="phone" />
          </div>
        ))}
      </div>
    </div>
  );
};
