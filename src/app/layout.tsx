import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "Next-gen Digital Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        <Navbar />
        {children}
        <Footer /> {/* Add Footer Here */}
      </body>
    </html>
  );
}