import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// In-Project
import AppProvider from './store/AppProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glucose Data Visualization",
  description: "Deployed by Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Need to provide the store globaly*/}
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
