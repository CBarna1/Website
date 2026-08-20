import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [submissions, subscribers, services, testimonials, blogPosts] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.newsletterSubscriber.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.blogPost.count(),
  ]);

  const cards = [
    { label: "Contact Submissions", value: submissions, href: "/admin/submissions" },
    { label: "Newsletter Subscribers", value: subscribers, href: "/admin/newsletter" },
    { label: "Services Listed", value: services, href: "/admin/services" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
    { label: "Blog Posts", value: blogPosts, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Overview of site activity and content.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-slate-200 dark:border-brand-800 bg-white dark:bg-brand-800 p-6 shadow-sm transition hover:shadow-md hover:bg-slate-50 dark:hover:bg-brand-700"
          >
            <p className="text-3xl font-bold text-brand-600 dark:text-brand-300">{card.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-brand-200">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
