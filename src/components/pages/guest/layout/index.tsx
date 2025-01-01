import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface GuestLayoutProps {
  children: ReactNode;
}

function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default GuestLayout;
