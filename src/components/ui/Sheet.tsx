import React, { forwardRef, useEffect, useState } from "react";
import { X } from "lucide-react";

interface SheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

// Utility function untuk mendapatkan style berdasarkan posisi
type SheetSide = "top" | "right" | "bottom" | "left";

const getSideStyles = (side: SheetSide) => {
  const styles: Record<SheetSide, string> = {
    top: "inset-x-0 top-0 border-b animate-slide-in-from-top",
    bottom: "inset-x-0 bottom-0 border-t animate-slide-in-from-bottom",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm animate-slide-in-from-left",
    right:
      "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm animate-slide-in-from-right",
  };
  return styles[side];
};

// Root Component
export const Sheet = ({
  children,
  isOpen,
  onClose,
  side = "right",
  className = "",
}: SheetProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted) return null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="animate-fade-in fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div
        className={`fixed z-50 bg-white shadow-lg ${getSideStyles(side)} ${className} `}
      >
        {children}
      </div>
    </div>
  );
};

// Header Component
export const SheetHeader = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
);
SheetHeader.displayName = "SheetHeader";

// Content Component
export const SheetContent = forwardRef<
  HTMLDivElement,
  SheetContentProps & { onClose?: () => void }
>(({ className = "", children, onClose, ...props }, ref) => (
  <div ref={ref} className={`relative p-6 ${className}`} {...props}>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    )}
    {children}
  </div>
));
SheetContent.displayName = "SheetContent";

// Footer Component
export const SheetFooter = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
);
SheetFooter.displayName = "SheetFooter";

// Title Component
export const SheetTitle = forwardRef<HTMLHeadingElement, SheetContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <h2
      ref={ref}
      className={`text-lg font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  ),
);
SheetTitle.displayName = "SheetTitle";

// Description Component
export const SheetDescription = forwardRef<
  HTMLParagraphElement,
  SheetContentProps
>(({ className = "", children, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
));
SheetDescription.displayName = "SheetDescription";

// Define animation keyframes in your global CSS or Tailwind config:
/*
@keyframes slide-in-from-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in-from-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in-from-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-in-from-right {
  animation: slide-in-from-right 0.3s ease-out;
}

.animate-slide-in-from-left {
  animation: slide-in-from-left 0.3s ease-out;
}

.animate-slide-in-from-top {
  animation: slide-in-from-top 0.3s ease-out;
}

.animate-slide-in-from-bottom {
  animation: slide-in-from-bottom 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
*/
