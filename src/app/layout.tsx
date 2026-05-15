import "./globals.css";

import type { Metadata } from "next";

import { defaultMetadata } from "@/seo/metadata";

export const metadata: Metadata =
  defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}