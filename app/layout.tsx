import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HRPhello",
  description: "Your HR Management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
