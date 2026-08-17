"use client";

import React, { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* BACKDROP */}

      <button
        type="button"
        aria-label="Tutup dialog"
        disabled={loading}
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
      />

      {/* DIALOG */}

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* CLOSE */}

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          aria-label="Tutup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:pointer-events-none disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* CONTENT */}

        <div className="p-6">
          {/* ICON */}

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>

          {/* TITLE */}

          <h2
            id="confirm-dialog-title"
            className="pr-8 text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>

          {/* DESCRIPTION */}

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {description}
          </p>
        </div>

        {/* FOOTER */}

        <div className="flex items-center justify-end gap-2 border-t bg-gray-50 px-6 py-4">
          {/* CANCEL */}

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          {/* CONFIRM */}

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex min-w-[130px] items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Menghapus...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
