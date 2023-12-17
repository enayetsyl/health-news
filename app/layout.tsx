import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health News",
  description: "Read and maintain for your well being.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <div className="lg:max-w-7xl mx-auto px-8 lg:px-16  min-h-screen flex flex-col shadow-xl">
        <Navbar/>
        <div className="flex-auto my-5">
        {children}
        </div>
        <Footer/>
        </div>
        </NextAuthProvider>
        </body>
    </html>
  );
}
