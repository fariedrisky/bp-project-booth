"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  slideInFromBottom,
} from "@/animation/motion";

const OurTeam = () => {
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

  const TeamMemberCard = ({
    member,
    index,
  }: {
    member: any;
    index: number;
  }) => (
    <motion.div variants={fadeInUp} custom={index}>
      <Card className="overflow-hidden rounded-none border-0 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <motion.div
            className="relative aspect-square"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={member.imageSrc}
              alt={member.name}
              fill
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="bg-white p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.position}</p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Header */}
      <motion.div
        className="mb-16 text-center"
        variants={slideInFromBottom(0.2)}
      >
        <h1 className="mb-4 font-serif text-4xl">
          Tim Kreatif Kami
          <br />
          Pengabadi <span className="italic">Momen Spesial</span>
        </h1>
        <p className="text-gray-600">
          Bertemu dengan tim kreatif kami yang berdedikasi untuk menghadirkan
          pengalaman photo booth terbaik di setiap acara Anda.
        </p>
      </motion.div>

      {/* Team Grid */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
      >
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OurTeam;
