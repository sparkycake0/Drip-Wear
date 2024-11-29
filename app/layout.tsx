import type { Metadata } from "next";
import "./globals.css";
import Provider from "./components/Provider";
import Navbar from "./components/Navbar";
export const metadata: Metadata = {
  title: "DripWear",
  description: "Entertaining website for ordering clothes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col bg-background text-foreground font-extrabold`}
      >
        <Provider />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
