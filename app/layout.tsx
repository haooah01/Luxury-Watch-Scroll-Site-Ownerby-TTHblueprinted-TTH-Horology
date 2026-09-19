import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THH Blueprinted",
  description: "A precision watch experience driven by scroll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
