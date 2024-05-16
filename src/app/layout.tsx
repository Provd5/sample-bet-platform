import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { NavigationBar } from "~/components/Nav/navigation-bar";
import { Toaster } from "~/components/ui/toaster";
import { cn } from "~/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Betowanie",
    template: "%s | 💸 Betowanie",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={cn(inter.className, "flex flex-col overflow-x-hidden")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationBar />
          <main className="h-full">{children}</main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
