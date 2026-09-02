import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogCard({
  title,
  slug,
  excerpt,
  image,
  animationDelay,
}: {
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  animationDelay?: string;
}) {
  return (
    <article
      className="site-card-float group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_22px_45px_rgba(47,95,255,0.12)] dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
      style={{ ["--card-delay" as string]: animationDelay }}
    >
      {image ? (
        <div className="relative h-40 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 to-transparent" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-brand-500 to-brand-700" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-brand-700 dark:text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
        >
          Read more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
