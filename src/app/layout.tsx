import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/header/NavbarComponent";
import { Suspense } from "react";
import Loading from "./loading";
import Error from "./error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | FullStack Morning",
  description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
  openGraph: {
    title: "Home | FullStack Morning",
    description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
    url: "https://fullstack-nextjs-morning.vercel.app/",
    siteName: "FullStack Morning",
    images: "https://media.licdn.com/dms/image/v2/C5612AQFxx3XzXO9Vew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1583841493429?e=2147483647&v=beta&t=nOghzOBbkw7pVweJUyiUzSYZtqz8l5EPsdHcnWvy-DU",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | FullStack Morning",
    description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
    images: "",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <ErrorBoundary errorComponent={Error}>
          <NavbarComponent />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
        
      </body>
    </html>
  );
}
