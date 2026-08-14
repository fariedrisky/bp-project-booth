"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Camera icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
        >
          <Camera size={32} strokeWidth={1.3} className="text-white/70" />
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="select-none text-[clamp(7rem,25vw,15rem)] font-black leading-[0.75] tracking-[-0.08em] text-white"
        >
          404
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-12 h-px bg-white/40"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-white/40">
            Moment not found
          </p>

          <h2 className="mt-4 text-2xl font-light tracking-tight sm:text-3xl">
            Oops, this moment doesn&apos;t exist.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50 sm:text-base">
            Sepertinya halaman yang kamu cari sudah dipindahkan, dihapus, atau
            memang tidak pernah ada.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="group flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:px-7"
          >
            <Home
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="group flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Go Back
          </button>
        </motion.div>

        {/* Branding */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-[10px] uppercase tracking-[0.5em] text-white/20"
        >
          BP Project Booth
        </motion.p>
      </div>
    </main>
  );
}
