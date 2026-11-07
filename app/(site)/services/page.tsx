import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import PageHero from "@/components/PageHero";
import { getServices } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { serviceDetails, type ServiceDetail } from "@/lib/serviceDetails";
import { Cable, Cctv, Cloud, Cpu, Laptop, MonitorPlay, Network, PhoneCall, Server, Video, type LucideIcon } from "lucide-react";

const detailIcons: Record<string, LucideIcon> = { Cable, Cctv, Cloud, Cpu, Laptop, MonitorPlay, Network, PhoneCall, Server, Video };

function DetailCard({ detail }: { detail: ServiceDetail }) {
  const Icon = detailIcons[detail.icon] ?? Server;
  return (
    <Link
      href={`/services/${detail.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/40"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{detail.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{detail.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
        Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export const metadata = {
  title: "Our Services | Kelson Innovations",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero title="Our Services" breadcrumb="Our Services" />

      <Section eyebrow="Latest Services" title="We are offering all kinds of IT solutions services">
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceDetails.filter((d) => d.group === "service").map((d) => (
            <DetailCard key={d.slug} detail={d} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Our Solutions" title="Hardware, telephony and ICT solutions" className="pt-0">
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceDetails.filter((d) => d.group === "solution").map((d) => (
            <DetailCard key={d.slug} detail={d} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Managed Services"
        title="We are dedicated to serve you all the time"
        description="From managed support to infrastructure deployment, our team covers every layer of your IT operations."
        className="pt-0"
      >
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={getIcon(service.icon)}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>

      <section className="bg-brand-600 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need a custom IT solution for your business?
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
