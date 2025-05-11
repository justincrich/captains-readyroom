import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SettingsProvider } from "@/hooks/useSettings";
import { AnimationProvider } from "@/components/animation-provider";

export const metadata: Metadata = {
  title: "Picard's Ready Room",
  description: "Receive wisdom from Captain Picard",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SettingsProvider>
            <AnimationProvider>
              {children}
              <Toaster />
            </AnimationProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
