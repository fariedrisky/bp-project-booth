"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import { logo1x1 } from "@/data/images/logo";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { handleLogin, isLoading } = useAuth(); // Mengambil isLoading
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleLogin(e, formData); // Mengirimkan formData
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-4">
      {/* Stars Background Effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-gray-700 bg-gray-800/50 shadow-xl backdrop-blur-sm">
        <CardContent className="px-6 pb-8 pt-6">
          {/* Logo */}
          <div className="mb-6 text-center">
            <div className="mb-4 inline-block bg-gray-700/50 p-1">
              <Image
                src={logo1x1}
                alt="Logo"
                width={100}
                height={100}
                className="h-12 w-12"
              />
            </div>
            <h1 className="mb-1 text-2xl font-semibold text-white">
              Login Management
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {" "}
            {/* Menggunakan onSubmit yang benar */}
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400"
                disabled={isLoading}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400"
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-gray-900 hover:bg-gray-100"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            {/* Demo Credentials Info */}
            <div className="mt-4 rounded-md bg-gray-700/30 p-3">
              <p className="text-xs text-gray-300">
                Demo Credentials:
                <br />
                Email: admin@admin.com
                <br />
                Password: admin123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* CSS for Stars Animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
