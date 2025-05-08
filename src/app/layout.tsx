import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { CustomCursor } from "@/components/custom-cursor";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: "Serigne Diaw | Data Scientist",
  description: "Personal portfolio of Serigne Diaw, a data scientist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${plusJakarta.variable} ${ibmPlexMono.variable}`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
