import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(public)/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev OS — Owner",
  description: "Private owner dashboard for Dev OS.",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0c0f14] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
