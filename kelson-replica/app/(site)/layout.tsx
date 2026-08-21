import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebGLBackground from "@/components/WebGLBackground";
import { getSiteSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <WebGLBackground src="/cd36293b-4b4a-4ade-9193-a9d1757d5f1d.jpg" theme="light" wash={0.08} />
      <WebGLBackground src="/rm373batch2-04.jpg" theme="dark" wash={0.2} />
      <div aria-hidden="true" className="light-background-gradient pointer-events-none fixed inset-0 z-[1] dark:hidden" />
      <div className="relative z-10 flex min-h-full flex-col">
          <Navbar phonePrimary={settings.phoneSecondary} />
          <main id="main-content" className="flex flex-1 flex-col">{children}</main>
          <Footer
            about={settings.about}
            address={settings.address}
            phonePrimary={settings.phonePrimary}
            phoneSecondary={settings.phoneSecondary}
            hours={settings.hours}
          />
      </div>
    </>
  );
}
