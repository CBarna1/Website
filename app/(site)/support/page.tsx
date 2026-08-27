import Link from "next/link";
import { LifeBuoy, Clock, ShieldCheck } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Support | Kelson Innovations",
};

const supportOptions = [
  {
    icon: LifeBuoy,
    title: "Submit a Ticket",
    description: "Log an issue with our support desk and our engineers will respond promptly.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Our support team monitors critical systems around the clock for peace of mind.",
  },
  {
    icon: ShieldCheck,
    title: "SLA-Backed Response",
    description: "Every ticket is handled according to your agreed service level agreement.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero title="Support" breadcrumb="Support" />

      <Section
        eyebrow="We are here to help"
        title="Get support from our expert team"
        description="Submit a ticket and one of our certified technicians will reach out to resolve your issue."
      >
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {supportOptions.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Submit a Support Ticket
          </Link>
        </div>
      </Section>
    </>
  );
}
