import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "User Management System",
  description: "A user management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} className="dark">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
