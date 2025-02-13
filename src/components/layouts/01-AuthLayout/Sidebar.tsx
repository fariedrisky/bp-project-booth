"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { logo } from "@/data/images/logo";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    {
      title: "Jadwal Event",
      icon: <Calendar size={20} />,
      href: "/events",
    },
    {
      title: "Laporan Crew",
      icon: <FileText size={20} />,
      href: "/reports",
    },
    {
      title: "Manajemen Akun Crew",
      icon: <Users size={20} />,
      href: "/crew",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="flex items-center gap-2 p-6">
        <Image src={logo} alt="Logo" width={1000} height={1000} />
        <span className="text-xl font-semibold">PhotoBooth</span>
      </div>

      <nav className="flex h-[calc(100vh-88px)] flex-col px-4 py-4">
        <p className="mb-4 px-4 text-xs font-semibold uppercase text-gray-500">
          Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <span className="w-full justify-start gap-3 text-primary hover:text-accent">
                {item.icon}
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
