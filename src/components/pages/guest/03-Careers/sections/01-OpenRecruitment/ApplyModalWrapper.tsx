"use client";

import React, { useState } from "react";
import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";

export default function ApplyModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
