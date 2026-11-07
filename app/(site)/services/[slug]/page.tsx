import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getServiceDetail, serviceDetails } from "@/lib/serviceDetails";

export function generateStaticParams() {
  return serviceDetails.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  return detail ? { title: `${detail.title} | Kelson Innovations`, description: detail.summary } : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <PageHero title={detail.title} breadcrumb="Our Services" />

      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {detail.tagline && (
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">{detail.tagline}</p>
        )}
        {detail.intro.map((p) => (
          <p key={p} className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-200">
            {p}
          </p>
        ))}

        {detail.blocks.map((block) => (
          <section key={block.heading} className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{block.heading}</h2>
            {block.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {p}
              </p>
            ))}
            {block.items && (
              <ul className={`mt-6 grid gap-4 ${block.items.some((i) => i.title) ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {block.items.map((item) => (
                  <li
                    key={item.title ?? item.text}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/40"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.title && (
                        <span className="block font-semibold text-slate-900 dark:text-white">{item.title}</span>
                      )}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {detail.closing && (
          <p className="mt-12 rounded-2xl border border-brand-100 bg-brand-50 p-6 leading-relaxed text-slate-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-slate-200">
            {detail.closing}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
        </div>
      </article>
    </>
  );
}
