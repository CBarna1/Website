import Link from "next/link";
import Image from "next/image";

export default function PageHero({ title, breadcrumb }: { title: string; breadcrumb: string }) {
  return (
    <section className="relative overflow-hidden py-16 text-center">
      <Image
        src="/happy-man-using-his-tablet-home-couch.jpg"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="hero-bg-wave object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-900/92 via-brand-800/85 to-brand-600/75"
      />
      <div className="relative mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="mt-3 text-brand-200">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / {breadcrumb}
        </p>
      </div>
    </section>
  );
}
