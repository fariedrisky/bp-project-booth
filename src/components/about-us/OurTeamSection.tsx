// components/OurTeamSection.tsx
import Image from "next/image";
import React from "react";

const teamMembers = [
  {
    name: "John Doe",
    position: "Photographer",
    imageSrc: "/path/to/image1.jpg",
  },
  {
    name: "Jane Smith",
    position: "Event Coordinator",
    imageSrc: "/path/to/image2.jpg",
  },
  {
    name: "Michael Lee",
    position: "Technician",
    imageSrc: "/path/to/image3.jpg",
  },
  {
    name: "Sara Connor",
    position: "Designer",
    imageSrc: "/path/to/image4.jpg",
  },
  { name: "Alex Kim", position: "Logistics", imageSrc: "/path/to/image5.jpg" },
  {
    name: "Emily Wong",
    position: "Customer Support",
    imageSrc: "/path/to/image6.jpg",
  },
  {
    name: "David Brown",
    position: "Operations",
    imageSrc: "/path/to/image7.jpg",
  },
  {
    name: "Sophia Black",
    position: "Marketing",
    imageSrc: "/path/to/image8.jpg",
  },
];

export default function OurTeamSection() {
  return (
    <section id="our-team" className="py-16 text-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-8 text-2xl font-bold text-secondary">Our Team</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-white p-4 shadow"
            >
              <Image
                src={member.imageSrc}
                alt={member.name}
                width={150}
                height={150}
                className="mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
