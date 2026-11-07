// Brings the "Brands we Stock" list in line with the previous kelson.co.zm site.
// Safe to run more than once: matches brands by name, updates logo and order, never deletes.
// Usage (from the project folder): node scripts/sync-brands.mjs
import { PrismaClient } from "@prisma/client";

// Order and logos as on the old site. "" = no logo (the page shows the name instead).
const brands = [
  ["HP", "/brands/hp.png"],
  ["Microsoft", "/brands/microsoft.png"],
  ["NetApp", "/brands/netapp.png"],
  ["IBM", "/brands/ibm.png"],
  ["Hitachi", "/brands/hitachi.jpg"],
  ["Opera PMS", "/brands/opera.png"],
  ["Simphony", "", ["Symphony"]],
  ["Dell", "/brands/dell.png"],
  ["Cisco", "/brands/cisco.png"],
  ["Fortinet", "/brands/fortinet.png"],
  ["Sun-Oracle", "/brands/sun-oracle.png"],
  ["Juniper Networks", "/brands/juniper.png"],
  ["Opera S&C", "/brands/opera.png"],
  ["Lenovo", "/brands/lenovo.png"],
  ["Hewlett Packard Enterprise", "/brands/hpe.png"],
  ["Oracle", "/brands/oracle.png"],
  ["Fujitsu", "/brands/fujitsu.png"],
  ["Nortel", "/brands/nortel.png"],
  ["Oracle Hospitality", "/brands/oracle-hospitality.png"],
];

const prisma = new PrismaClient();
const existing = await prisma.brand.findMany();
const byName = new Map(existing.map((b) => [b.name.toLowerCase(), b]));
let order = 0;
for (const [name, src, oldNames = []] of brands) {
  const row = [name, ...oldNames].map((n) => byName.get(n.toLowerCase())).find(Boolean);
  if (row) {
    await prisma.brand.update({ where: { id: row.id }, data: { name, src, order } });
    byName.delete(row.name.toLowerCase());
    console.log("updated", name);
  } else {
    await prisma.brand.create({ data: { name, src, order } });
    console.log("added  ", name);
  }
  order++;
}
// Brands only on the new site (e.g. Ubiquiti, Epson) stay, after the others.
for (const b of [...byName.values()].sort((a, b) => a.order - b.order)) {
  await prisma.brand.update({ where: { id: b.id }, data: { order: order++ } });
  console.log("kept   ", b.name);
}
await prisma.$disconnect();
