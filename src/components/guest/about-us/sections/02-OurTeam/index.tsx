import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const OurTeam = () => {
  const categories = [
    "View all",
    "Management",
    "Product",
    "Design",
    "Marketing",
    "Sales",
    "Customer Success",
    "Operations",
  ];

  const teamMembers = [
    {
      name: "Emmy Rosum",
      position: "Co-Founder and CEO",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Orlando Diggs",
      position: "Co-Founder and COO",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Sophie Chamberlain",
      position: "Head of Sales",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Lana Steiner",
      position: "VP of Customer Success",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Emily Donnavan",
      position: "Product Lead",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Sasha Kindred",
      position: "VP of Marketing",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Jessica Dobrev",
      position: "Backend Lead",
      imageSrc: "/public/assets/images/user.jpg",
    },
    {
      name: "Drew Cano",
      position: "Head of UX",
      imageSrc: "/public/assets/images/user.jpg",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-4xl">
          Meet the team that makes
          <br />
          the <span className="italic">magic</span> happen
        </h1>
        <p className="text-gray-600">
          Meet our diverse team of world-class creators, designers, and problem
          solvers.
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="View all" className="mb-12">
        <TabsList className="flex flex-wrap justify-center gap-2 rounded-none">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-none px-4 py-2 hover:bg-gray-100"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Team Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="overflow-hidden rounded-none border-0 shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-white p-4 text-center">
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
