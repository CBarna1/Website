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
      className="site-card-float flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
      style={{ ["--card-delay" as string]: animationDelay }}
    >
      {image ? (
        <div className="relative h-40">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-brand-500 to-brand-700" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Read more <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
