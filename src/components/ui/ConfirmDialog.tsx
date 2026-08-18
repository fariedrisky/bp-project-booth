"use client";

import React, { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Konfirmasi",
  description = "Apakah kamu yakin ingin melanjutkan?",
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    // Lock scroll
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Unlock scroll
      document.body.style.overflow = originalOverflow;

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Tutup dialog"
            disabled={loading}
            onClick={onCancel}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
            initial={{
              opacity: 0,
              scale: 0.98,
              y: 6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: 6,
            }}
            transition={{
              duration: 0.22,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Close Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onCancel}
              disabled={loading}
              aria-label="Tutup"
              className="absolute right-4 top-4 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="p-6">
              {/* Icon */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.2,
                  delay: 0.03,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50"
              >
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </motion.div>

              {/* Title */}
              <h2
                id="confirm-dialog-title"
                className="pr-8 text-lg font-semibold text-gray-900"
              >
                {title}
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t bg-gray-50 px-6 py-4">
              {/* Cancel */}
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {cancelText}
              </Button>

              {/* Confirm */}
              <Button
                type="button"
                variant="destructive"
                onClick={onConfirm}
                disabled={loading}
                className="min-w-[130px] rounded-md"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Menghapus...
                  </>
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
