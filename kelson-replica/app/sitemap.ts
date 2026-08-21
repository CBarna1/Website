import type { MetadataRoute } from "next";

const baseUrl = "https://kelson.co.zm";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/products", "/services", "/brands", "/contact", "/support", "/track"];
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
