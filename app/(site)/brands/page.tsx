import Image from "next/image";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { getBrands } from "@/lib/data";

export const metadata = {
  title: "Brands We Stock | Kelson Innovations",
};

// One line per brand, from the previous kelson.co.zm "Brands we Stock" page. Matched by name, ignoring case.
const blurbs: Record<string, string> = {
  hp: "Pioneers in computing and printing solutions.",
  microsoft: "Leaders in software solutions including Microsoft 365.",
  netapp: "Innovators in data management and storage solutions.",
  ibm: "Offering enterprise-grade servers and storage.",
  hitachi: "Specialists in data storage solutions and IT services.",
  "opera pms": "Top provider in hotel property management and guest services.",
  simphony: "Leading platform for hospitality point-of-sale (POS) systems in food and beverage.",
  dell: "Known for their robust servers and storage solutions.",
  cisco: "Experts in networking hardware and security solutions.",
  fortinet: "Providers of advanced firewall and security solutions.",
  "sun-oracle": "Renowned for their enterprise servers and storage solutions.",
  "juniper networks": "Leaders in high-performance networking solutions.",
  "opera s&c": "Premier solution for event and catering management in hotels.",
  lenovo: "Renowned for their versatile laptops and PCs.",
  "hewlett packard enterprise": "Specialists in enterprise IT infrastructure.",
  oracle: "Trusted for their high-performance servers and storage systems.",
  fujitsu: "Known for their reliable and high-performing IT infrastructure solutions.",
  nortel: "Providers of advanced telecommunications and network equipment.",
  "oracle hospitality": "Industry leader in cloud-based hotel operations and guest engagement.",
};

export default async function BrandsPage() {
  const brandsWeStock = await getBrands();

  return (
    <>
      <PageHero title="Brands We Stock" breadcrumb="Brands we Stock" />

      <Section
        eyebrow="Featured Brands"
        title="We stock and support top enterprise brands"
        description="At Kelson Innovations, we are proud to offer a diverse range of high-quality products from industry-leading brands. Our partnerships with these renowned companies enable us to provide top-tier IT solutions that meet the highest standards of performance, reliability, and innovation."
      >
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brandsWeStock.map((brand) => {
            const blurb = blurbs[brand.name.toLowerCase()];
            return (
              <div
                key={brand.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
              >
                <div className="flex h-20 items-center justify-center rounded-xl bg-white px-2">
                  {brand.src ? (
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={160}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-bold tracking-tight text-slate-800">{brand.name}</span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{brand.name}</h3>
                {blurb && <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{blurb}</p>}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
