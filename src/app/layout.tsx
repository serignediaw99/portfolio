import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${plusJakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}
