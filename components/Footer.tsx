import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, Lock } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import { nav, companyName, companyLogo } from "@/lib/data";

type FooterProps = {
  about: string;
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  hours: string;
};

export default function Footer({ about, address, phonePrimary, phoneSecondary, hours }: FooterProps) {
  return (
    <footer className="site-footer mt-auto bg-brand-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Image src={companyLogo} alt={companyName} width={160} height={48} className="h-10 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-white">{about}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white transition hover:text-brand-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-white" />
              {address}
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-white" />
              <span className="flex flex-col">
                <span>{phonePrimary}</span>
                <span>{phoneSecondary}</span>
              </span>
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 shrink-0 text-white" />
              {hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Newsletter</h3>
          <p className="mt-4 text-sm text-white">
            Subscribe to get our latest updates and news.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 border-t border-brand-800 py-6 text-center text-xs text-white">
        <span>(c) {new Date().getFullYear()} {companyName} - All rights reserved.</span>
        <Link
          href="/admin/login"
          aria-label="Admin login"
          title="Admin login"
          className="text-white transition hover:text-brand-200"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
