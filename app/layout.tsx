import type { Metadata } from "next";
import "./globals.css";
import "./themes.css";
import AppearanceProvider from './theme-provider';

export const metadata: Metadata = {
  title: "Sanctuary | Church Planning",
  description: "A thoughtful home for preaching schedules, service flows, and announcements.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased"><AppearanceProvider>{children}</AppearanceProvider></body>
    </html>
  );
}

