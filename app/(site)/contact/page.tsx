import { MapPin, Phone, Clock, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { getSiteSettings } from "@/lib/data";

export const metadata = {
  title: "Contact Us | Kelson Innovations",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero title="Contact Us" breadcrumb="Contact Us" />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Get in touch</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Have a question about our IT solutions? Send us a message and our team will get back
            to you.
          </p>

          <ul className="mt-8 space-y-5 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              {settings.address}
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <span className="flex flex-col">
                <span>{settings.phonePrimary}</span>
                <span>{settings.phoneSecondary}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              {settings.hours}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              info@kelson.co.zm
            </li>
          </ul>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/65 p-4 dark:border-slate-700 dark:bg-slate-900/45">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Typical response</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Our team aims to respond to new enquiries within one business day.</p>
            </div>
            <a href="https://wa.me/26095572911" className="rounded-xl border border-accent-200 bg-accent-50/70 p-4 transition hover:border-accent-400 dark:border-accent-800 dark:bg-accent-950/30">
              <p className="text-sm font-semibold text-accent-800 dark:text-accent-300">Chat on WhatsApp</p>
              <p className="mt-1 text-xs text-accent-700 dark:text-accent-400">Start a quick conversation with our team.</p>
            </a>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
