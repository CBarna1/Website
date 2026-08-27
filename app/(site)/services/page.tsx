import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import PageHero from "@/components/PageHero";
import { getServices } from "@/lib/data";
import { getIcon } from "@/lib/icons";

export const metadata = {
  title: "Our Services | Kelson Innovations",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero title="Our Services" breadcrumb="Our Services" />

      <Section
        eyebrow="Latest Services"
        title="We are offering all kinds of IT solutions services"
        description="From managed support to infrastructure deployment, our team covers every layer of your IT operations."
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
