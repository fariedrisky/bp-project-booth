import React from "react";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <div className="flex w-96 items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
        <Search size={20} className="text-gray-400" />
        <Input
          type="text"
          placeholder="Search orders..."
          className="border-none bg-transparent focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-medium">Admin</p>
            <p className="text-sm text-gray-500">admin@photobooth.com</p>
          </div>
          <Image
            src="/api/placeholder/40/40"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
