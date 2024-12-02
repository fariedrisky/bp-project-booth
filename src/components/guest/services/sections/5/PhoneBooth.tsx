import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

// Phone Booth Component
const phoneBoothServices = [
  {
    id: 1,
    title: "Phone Booth",
    description: "Booth dengan setup khusus untuk pengambilan video message",
    price: 2000000,
    features: "Message Video Recording",
    duration: "3 Hours",
    additionalInfo: "All File Message Video",
  },
];

export const PhoneBooth = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 font-serif text-3xl font-bold">Phone Booth</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {phoneBoothServices.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src="/api/placeholder/400/320"
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Features</span>
                    <span className="font-medium">{service.features}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Included</span>
                    <span className="font-medium">
                      {service.additionalInfo}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t p-4">
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      Rp {service.price.toLocaleString("id-ID")}
                    </span>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
