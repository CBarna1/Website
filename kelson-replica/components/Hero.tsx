import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Server, PhoneCall, Network, LifeBuoy } from "lucide-react";
import Scroll3D from "@/components/Scroll3D";

const heroCategories = [
  {
    icon: ShieldCheck,
    label: "CCTV Security Solutions",
    description: "24/7 surveillance systems that keep your premises secure and monitored in real time.",
  },
  {
    icon: Server,
    label: "IT Hardware & Accessories",
    description: "Reliable enterprise-grade hardware and accessories sourced from trusted global brands.",
  },
  {
    icon: PhoneCall,
    label: "Collaboration & Telephony",
    description: "Modern voice, video, and messaging tools that keep your teams connected anywhere.",
  },
  {
    icon: Network,
    label: "ICT Solutions",
    description: "End-to-end network and infrastructure design built to scale with your business.",
  },
  {
    icon: LifeBuoy,
    label: "Support Management",
    description: "Round-the-clock monitoring and support so your systems stay online and optimized.",
  },
];

export default function Hero({ tagline, blurb }: { tagline: string; blurb: string }) {
  return (
    <section className="relative overflow-hidden">
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
      <div
        aria-hidden="true"
        className="motion-drift pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="motion-reveal relative">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100">
            We are an IT service agency
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {tagline}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-brand-100">{blurb}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="motion-pulse inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-lg transition hover:bg-brand-50"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Our Services
            </Link>
          </div>
        </div>

        <div className="relative min-h-[390px]">
          <Scroll3D />
          <div className="relative z-10 grid grid-cols-2 gap-4 pt-24 sm:grid-cols-2 lg:pt-12">
          {heroCategories.map(({ icon: Icon, label, description }, index) => (
            <div
              key={label}
              className="hero-solution-wave motion-reveal group h-36"
              style={{ animationDelay: `${index * 90 + 160}ms`, "--wave-delay": `${index * 180}ms` } as React.CSSProperties}
            >
              <div className="flip-card h-full">
                <div className="flip-card-inner h-full group-hover:[transform:rotateY(180deg)]">
                  <div className="flip-card-face flex flex-col gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-white">{label}</span>
                  </div>
                  <div className="flip-card-face flip-card-back flex flex-col justify-center gap-2 rounded-2xl bg-brand-700 p-5">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-100">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                    <p className="text-xs leading-relaxed text-white/90">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="motion-reveal flex h-36 flex-col justify-center rounded-2xl bg-accent-500/90 p-5 text-white" style={{ animationDelay: "610ms" }}>
            <span className="text-2xl font-extrabold">15,000+</span>
            <span className="text-sm">Happy clients served</span>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
