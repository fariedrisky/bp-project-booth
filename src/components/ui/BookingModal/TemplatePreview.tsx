import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
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
  const [slides, setSlides] = useState<Array<{ src: string; alt: string }>>([]);

  // Prepare slides when service changes or modal opens
  useEffect(() => {
    if (service && isOpen) {
      const images = Array.isArray(service.templateImage)
        ? service.templateImage
        : service.templateImage
          ? [service.templateImage]
          : [];

      const formattedSlides = images.map((img, index) => ({
        src: img,
        alt: `${service.title} Template Option ${index + 1}`,
      }));

      setSlides(formattedSlides);
    }
  }, [service, isOpen]);

  const isSingleImage = slides.length <= 1;

  return (
    <Lightbox
      open={isOpen && slides.length > 0}
      close={onClose}
      slides={slides}
      plugins={[Zoom]}
      carousel={{ finite: true }}
      animation={{ fade: 300 }}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
      }}
      render={{
        buttonPrev: isSingleImage ? () => null : undefined,
        buttonNext: isSingleImage ? () => null : undefined,
      }}
    />
  );
}
