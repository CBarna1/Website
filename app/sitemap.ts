import type { MetadataRoute } from "next";
import { serviceDetails } from "@/lib/serviceDetails";

const baseUrl = "https://kelson.co.zm";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/products", "/services", "/brands", "/contact", "/support", "/track", ...serviceDetails.map((d) => `/services/${d.slug}`)];
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
