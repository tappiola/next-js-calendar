import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event calendar",
  description: "Manage your vacations easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-6 min-h-screen bg-stone-800 text-neutral-50 antialiased">
        {children}
      </body>
    </html>
  );
}
