import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageLoader from "@/components/PageLoader";
import CartProvider from "@/components/CartProvider";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kelson.co.zm"),
  title: "Kelson Innovations | IT Solutions & Managed Services",
  description:
    "Kelson Innovations delivers comprehensive IT hardware, managed services, and support to empower your business in Zambia and beyond.",
  openGraph: {
    title: "Kelson Innovations | IT Solutions & Managed Services",
    description: "IT hardware, managed services, support, and printing for businesses in Zambia.",
    url: "https://kelson.co.zm",
    siteName: "Kelson Innovations",
    type: "website",
    images: [{ url: "/logo-title.png", width: 512, height: 512, alt: "Kelson Innovations" }],
  },
  twitter: {
    card: "summary",
    title: "Kelson Innovations | IT Solutions & Managed Services",
    description: "IT hardware, managed services, support, and printing for businesses in Zambia.",
  },
  icons: {
    icon: "/logo-title.png",
    shortcut: "/logo-title.png",
    apple: "/logo-title.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          // Runs before paint to avoid a flash of the wrong theme
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
          <a href="#main-content" className="skip-link">Skip to main content</a>
        <PageLoader />
          <Analytics />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
