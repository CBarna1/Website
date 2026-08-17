import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebGLBackground from "@/components/WebGLBackground";
import { getSiteSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <WebGLBackground src="/rm373batch2-04.jpg" />
      <Navbar phonePrimary={settings.phonePrimary} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer
        about={settings.about}
        address={settings.address}
        phonePrimary={settings.phonePrimary}
        phoneSecondary={settings.phoneSecondary}
        hours={settings.hours}
      />
    </>
  );
}
