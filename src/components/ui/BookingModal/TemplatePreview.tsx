import React from "react";
import Image from "next/image";
import { ServiceType } from "../ServiceCard";

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceType;
}

export default function TemplatePreview({
  isOpen,
  onClose,
  service,
}: TemplatePreviewProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <Image
          src={service.templateImage || ""}
          alt={`${service.title} Template Options`}
          width={800}
          height={1000}
          className="max-h-[85vh] object-contain"
          priority
        />
      </div>
    </div>
  );
}
