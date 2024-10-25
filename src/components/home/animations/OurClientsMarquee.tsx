import * as clientImages from "@/data/images/ClientImages";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const clientImagesArray = Object.values(clientImages);

export default function OurClientsMarquee() {
  return (
    <Marquee speed={100} pauseOnHover={true} gradient gradientColor="white">
      <div className="flex gap-8">
        {clientImagesArray.map((src, index) => (
          <div
            key={index}
            className="mx-4 h-20 w-20 flex-shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src={src}
                height={100}
                alt={`Client ${index + 1}`}
                objectFit="contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </Marquee>
  );
}
