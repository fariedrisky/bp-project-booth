"use client";
import React from "react";
import BasicBooth from "./sections/01-BasicBooth";
import MiniBooth from "./sections/02-MiniBooth";
import { Booth180 } from "./sections/03-180Booth";
import { WideAngleBooth } from "./sections/04-WideAngleBooth";
import { PhoneBooth } from "./sections/05-PhoneBooth";

const Service = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <BasicBooth />
      <MiniBooth />
      <Booth180 />
      <WideAngleBooth />
      <PhoneBooth />
    </div>
  );
};

export default Service;
