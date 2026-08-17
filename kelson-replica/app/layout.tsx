import type { Metadata } from "next";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelson Innovations | IT Solutions & Managed Services",
  description:
    "Kelson Innovations delivers comprehensive IT hardware, managed services, and support to empower your business in Zambia and beyond.",
  icons: {
    icon: "/logo-title.png",
    shortcut: "/logo-title.png",
    apple: "/logo-title.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
