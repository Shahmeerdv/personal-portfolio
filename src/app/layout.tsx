import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import BackgroundBlobs from "@/components/BackgroundBlobs"; // 👈 1. Import the blobs

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shahmeer | Visual & Code",
  description: "Portfolio of Shahmeer - Graphic Designer & Software Developer. Specializing in high-performance software and avant-garde graphics.",
  
  openGraph: {
    title: "Shahmeer | Visual & Code",
    description: "Graphic Designer & Software Developer.",
    url: "https://shahmeer.tech",
    siteName: "Shahmeer Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        
        {/* 👇 2. Add the background component here */}
        <BackgroundBlobs />
        
        <Navbar />
        {children}
        <Footer /> 
      </body>
    </html>
  );
}