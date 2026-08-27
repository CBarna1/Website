import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { getSiteSettings, getWhyChooseUs } from "@/lib/data";

export const metadata = {
  title: "About Us | Kelson Innovations",
};

const highlights = [
  "Cloud IaaS and SaaS solutions",
  "Microsoft 365 development, migration & adoption",
  "Custom Wi-Fi and networking infrastructure",
  "Advanced IP-PABX systems and Teams Phone integration",
  "Identity management and firewall solutions",
];

export default async function AboutPage() {
  const [settings, whyChooseUs] = await Promise.all([getSiteSettings(), getWhyChooseUs()]);

  return (
    <>
      <PageHero title="About Us" breadcrumb="About" />

      <Section eyebrow="Best Awarded Company" title="Our Vision & Mission" center={false}>
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{settings.about}</p>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Our expertise spans a wide array of ICT solutions, including Cloud IAAS and SAAS, as
            well as Microsoft 365 development, migration, and adoption. We enhance connectivity
            through customized Wi-Fi and networking infrastructure, and we improve communication
            with advanced IP-PABX systems and Teams Phone Integration. Security is a cornerstone
            of our offerings - we provide robust identity management and firewall solutions to
            protect your digital assets.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 py-20 dark:bg-transparent">
        <Section eyebrow="Why Choose Us" title="Driven by innovation, committed to excellence">
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <section className="bg-brand-600 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to work with a trusted IT partner?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
