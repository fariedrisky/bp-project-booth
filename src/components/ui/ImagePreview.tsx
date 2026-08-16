"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

type ImagePreviewProps = {
  src: string;
  alt: string;
};

export default function ImagePreview({ src, alt }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block overflow-hidden rounded-lg"
      >
        <Image
          src={src}
          alt={alt}
          width={120}
          height={80}
          className="h-16 w-24 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
          <span className="text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
            Preview
          </span>
        </div>
      </button>

      {/* Preview Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-gray-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Large Image */}
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
