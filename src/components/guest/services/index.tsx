"use client";
import React from "react";
import BasicBooth from "./sections/1/BasicBooth";
import MiniBooth from "./sections/2/MiniBooth";
import { Booth180 } from "./sections/3/Booth180";
import { WideAngleBooth } from "./sections/4/WideAngleBooth";
import { PhoneBooth } from "./sections/5/PhoneBooth";

const Service = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
      <BasicBooth />
      <MiniBooth />
      <Booth180 />
      <WideAngleBooth />
      <PhoneBooth />
    </div>
  );
};

export default Service;
