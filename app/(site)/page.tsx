import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import StatCounter from "@/components/StatCounter";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import {
  getSiteSettings,
  getServices,
  getWhyChooseUs,
  getProcessSteps,
  getStats,
  getTestimonials,
  getBlogPosts,
  getClientLogos,
} from "@/lib/data";

export default async function Home() {
  const [settings, services, whyChooseUs, workingProcess, stats, testimonials, blogPosts, clientLogos] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getWhyChooseUs(),
      getProcessSteps(),
      getStats(),
      getTestimonials(),
      getBlogPosts(),
      getClientLogos(),
    ]);

  const processAnimationKey = Date.now();

  return (
    <>
      <Hero tagline={settings.tagline} blurb={settings.blurb} />
      <ClientLogos clients={clientLogos} />

      <Section
        eyebrow="Our Awesome Services"
        title="We are dedicated to serve you all the time"
        description="A full suite of managed IT services, infrastructure, and support designed around your business needs."
      >
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="motion-reveal"
              style={{ animationDelay: `${index * 90}ms`, ["--card-delay" as string]: `${index * 900}ms` }}
            >
              <ServiceCard
              icon={getIcon(service.icon)}
              title={service.title}
              description={service.description}
              />
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden py-16">
        <div aria-hidden="true" className="absolute inset-0 dark:hidden">
          <Image src="/rm373batch2-04.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-brand-900/70" />
        </div>
        <div
          aria-hidden="true"
          className="water-wave-back pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-70"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M0,30 C50,0 150,60 200,30 L200,60 L0,60 Z' fill='rgba(255,255,255,0.10)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "200px 100%",
          }}
        />
        <div
          aria-hidden="true"
          className="water-wave-front pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-80"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M0,40 C50,10 150,70 200,40 L200,60 L0,60 Z' fill='rgba(20,184,166,0.18)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "160px 100%",
          }}
        />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <StatCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </section>

      <Section
        eyebrow="Why Choose Us?"
        title="We serve a wide variety of industries"
        description={settings.about}
      >
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => (
            <div
              key={item.id}
              className="site-card-float rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
              style={{ ["--card-delay" as string]: `${index * 900}ms` }}
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          About Us <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      <section className="bg-slate-50 py-20 dark:bg-transparent">
        <Section
          eyebrow="Working Process"
          title="How we work for our customers"
          className="!py-0"
        >
          <div className="process-track relative mt-12">
            <div key={processAnimationKey} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {workingProcess.map((step, index) => (
                <div key={step.id}>
                  <div
                    className="process-step relative text-left"
                    style={{
                      ["--step-index" as string]: index,
                    }}
                  >
                    <div className="process-step-marker">
                      <span className="text-4xl font-extrabold text-brand-200">{step.step}</span>
                    </div>
                    <div className="process-copy process-copy-wave mt-3 rounded-[1.65rem] border border-brand-100 bg-white/75 p-5 shadow-[0_12px_30px_rgba(47,95,255,0.08)] ring-1 ring-brand-200/50 dark:border-brand-800 dark:bg-slate-900/40 dark:shadow-[0_14px_40px_rgba(47,95,255,0.13)]">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="process-text mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <Section eyebrow="Testimonials" title="Here is what our customers have said">
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <TestimonialCard
              key={t.id}
              name={t.name}
              role={t.role}
              quote={t.quote}
              animationDelay={`${index * 180}ms`}
            />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 py-20 dark:bg-transparent">
        <Section eyebrow="Blog" title="Our latest blog" className="!py-0">
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                image={post.image}
                animationDelay={`${index * 900}ms`}
              />
            ))}
          </div>
        </Section>
      </section>

      <section className="bg-brand-600 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Looking for the best IT business solutions?
          </h2>
          <p className="max-w-xl text-brand-100">
            Get in touch with our team for a tailored quote on any of our IT products or services.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
