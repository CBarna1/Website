import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getBlogPostBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.title} breadcrumb="Blog" />

      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        {post.image ? (
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-64 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700" />
        )}
        <p className="mt-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">{post.excerpt}</p>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
          With over a decade of experience, Kelson Innovations has established itself as one of
          the leading IT partners in the region, helping organizations navigate change with
          confidence and modern technology.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Back to Home
        </Link>
      </article>
    </>
  );
}
