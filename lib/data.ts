import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) {
    throw new Error("SiteSettings not seeded. Run `npx prisma db seed`.");
  }
  return settings;
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function getWhyChooseUs() {
  return prisma.whyChooseUsItem.findMany({ orderBy: { order: "asc" } });
}

export async function getProcessSteps() {
  return prisma.processStep.findMany({ orderBy: { order: "asc" } });
}

export async function getStats() {
  return prisma.stat.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function getBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { order: "asc" } });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getClientLogos() {
  return prisma.clientLogo.findMany({ orderBy: { order: "asc" } });
}

export async function getBrands() {
  return prisma.brand.findMany({ orderBy: { order: "asc" } });
}

export async function getProducts() {
  return prisma.product.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug, active: true } });
}

// `short` is the label in the desktop header bar; the phone menu and footer have room for the full `label`.
export const nav = [
  { label: "Home", short: "Home", href: "/" },
  { label: "About Us", short: "About", href: "/about" },
  { label: "Our Services", short: "Services", href: "/services" },
  { label: "Products & Services", short: "Products", href: "/products" },
  { label: "Brands we Stock", short: "Brands", href: "/brands" },
  { label: "Contact Us", short: "Contact", href: "/contact" },
  { label: "Support", short: "Support", href: "/support" },
];

export const companyName = "Kelson Innovations";
export const companyLogo = "/logo-m.png";
// The circle mark on its own, for the header bar.
export const companyMark = "/logo-title.png";
