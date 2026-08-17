import Image from "next/image";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import { getBrands } from "@/lib/data";

export const metadata = {
  title: "Brands We Stock | Kelson Innovations",
};

export default async function BrandsPage() {
  const brandsWeStock = await getBrands();

  return (
    <>
      <PageHero title="Brands We Stock" breadcrumb="Brands we Stock" />

      <Section
        eyebrow="Our Partners"
        title="We stock and support top enterprise brands"
        description="We work with globally recognized manufacturers to deliver reliable, enterprise-grade hardware and software."
      >
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {brandsWeStock.map((brand) => (
            <div
              key={brand.id}
              className="flex h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={160}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
